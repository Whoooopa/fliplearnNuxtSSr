import { user } from "~/types/type";
import { firestore, bucket } from "../../../utils/firebase"
import formidable from 'formidable'
import fs from "fs";
import stream from 'stream';


export default defineEventHandler(async (event) => {

  const uid = getCookie(event, 'uid');
  if(!uid) return;

  const form = formidable({ multiples: true });

  const data = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if(files.img) {
        const img = files.img[0]
        resolve({...fields, img});

      }
      resolve({...fields});
    });
  });

  if(data.img){

    const {imgPath} = await $fetch<user>('/api/user/user',
      { headers: {
        'Cookie' : `uid=${uid}`
      } }
    );
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
  
    
    streamFileUpload().catch(console.error);
    const signedUrls = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    })
      // signedUrls[0] contains the file's public URL
      
      const newUserData :user = {
        name: data.username.toString(),
        imgUrl: signedUrls[0],
      }
  
      // console.log(data.deck.toString())
      firestore.collection('users').doc(uid).set({
        ...newUserData,
        imgPath: fileName
      }, {
        merge: true
      })
  } else {

    const newUserData :user = {
      name: data.username.toString(),
    }

    firestore.collection('users').doc(uid).set({
      ...newUserData
    }, {
      merge: true
    })
  }
})