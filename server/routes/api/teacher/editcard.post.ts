import { card } from "~/types/type";
import { firestore, bucket } from "../../../utils/firebase"
import formidable from 'formidable'
import fs from "fs";
import stream from 'stream';


export default defineEventHandler(async (event) => {

  const form = formidable({ multiples: true });

  const data = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {

      if(files.img){
        const img = files.img[0]
        
        resolve({...fields, img});

      } else {
        resolve({...fields});
      }

    });
  });

  if(data.img) {
    
    const imgPath = data.bucketPath
    if(imgPath && imgPath?.length != 0){
      bucket.file(imgPath.toString()).delete();
    }
  
    const img = data.img;
    const originalFilename :string = img.originalFilename;
    const extension = originalFilename.substring(img.originalFilename.lastIndexOf('.') + 1);
    const fileName = Date.now() + img.newFilename + "." + extension;
    const file = bucket.file(fileName);
    const contents = fs.readFileSync(img.filepath)
    
    const passthroughStream = new stream.PassThrough();
    passthroughStream.write(contents);
    passthroughStream.end();
  
    async function streamFileUpload() {
      passthroughStream.pipe(file.createWriteStream()).on('finish', () => {
        // The file upload is complete
      });
  
    }
    await streamFileUpload().catch(console.error);
    const signedUrls = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    })
      // signedUrls[0] contains the file's public URL
    const card :card = {
      title: data.title.toString(),
      desc: data.desc.toString(),
      question: data.question.toString(),
      answers: JSON.parse(data.answers.toString()),
      imgUrl: signedUrls[0],
      bucketPath: fileName
    }

    const deckId = data.deck.toString()
    const cardId = data.card.toString()
    await firestore.collection('decks').doc(deckId).collection('cards').doc(cardId).set({
      ...card
    })
  } else {
    // if no img
    const card :card = {
      title: data.title.toString(),
      desc: data.desc.toString(),
      question: data.question.toString(),
      answers: JSON.parse(data.answers.toString()),
    }

    const deckId = data.deck.toString()
    const cardId = data.card.toString()
    await firestore.collection('decks').doc(deckId).collection('cards').doc(cardId).update({
      ...card
    })
  }

  
})