import { card } from "~/types/type";
import { firestore, bucket } from "../../utils/firebase"
import formidable from 'formidable'
import fs from "fs";
import stream from 'stream';


export default defineEventHandler(async (event) => {

  const form = formidable({ multiples: true });

  const data = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      const img = files.img[0]
      
      resolve({...fields, img});
    });
  });

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

    // console.log(`${fileName} uploaded`);
  }

  
  streamFileUpload().catch(console.error);
  file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491',
  }).then(signedUrls => {
    // signedUrls[0] contains the file's public URL
    
    const card :card = {
      title: data.title.toString(),
      desc: data.desc.toString(),
      question: data.question.toString(),
      answers: JSON.parse(data.answers.toString()),
      imgUrl: signedUrls[0],
      bucketPath: fileName,
    }

    const deckId = data.deck.toString()
    firestore.collection('decks').doc(deckId).collection('cards').doc().set({
      ...card
    })
  });
})