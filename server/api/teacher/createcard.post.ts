import { card } from "~/types/type";
import { app,firestore } from "../../utils/firebase"

export default defineEventHandler(async (event) => {

  const formdata = await readMultipartFormData(event);

  if (!formdata) return;

  const card :card = {
    title: formdata[0].data.toString('utf-8'),
    desc: formdata[1].data.toString('utf-8'),
    question: formdata[2].data.toString('utf-8'),
    answers: JSON.parse(formdata[3].data.toString('utf-8'))
  }

  const deckId = formdata[4].data.toString('utf-8')
  firestore.collection('decks').doc(deckId).collection('cards').doc().set({
    ...card
  })
})
