'use client'

import { useState } from "react"

export default function AddImage() {
  const [image, setImage] = useState(null)
  const [desc, setDesc] = useState("")

  async function sendImage(e) {
    e.preventDefault()

    if (!image) {
      alert("Por favor, selecione uma imagem!")
      return
    }

    try {
      const formData = new FormData();
      formData.append('foto', image); 
      formData.append('desc', desc); 

      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Imagem enviada com sucesso!', data);
      } else {
        const errorData = await response.json();
        console.error('Erro ao enviar a imagem:', response.status, response.statusText, errorData);
        alert(`Error uploading image: ${response.status} - ${response.statusText}. Check the console for details.`); 
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert("An error occurred during the request. Check the console for details.");
    }
  }

  return (
    <>
      <p>image</p>

      <form onSubmit={sendImage} className="flex flex-col h-48 w-64 m-10">
        <input
          type="file"
          accept="image/*"
          name="foto"
          id="foto"
          onChange={(e) => setImage(e.target.files[0])}
          
        />
        <input
          type="text"
          name="desc"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
            className="text-black"
        />
        <input type="submit" value="Enviar" />
      </form>
    </>
  )
}


//server next ->
export async function POST(req){
    const body = await req.formData();

    const file = body.get('foto');
    const fileName = file.name


    const bufferDataImage = Buffer.from(await file.arrayBuffer());

    const imagesFolder = path.join('C:', 'Users', 'Administrator', 'Desktop', 'next', 'my-app', 'public', 'images', fileName);

    try {
        fs.writeFileSync(imagesFolder, bufferDataImage);
        console.log('sucesso')
    } catch (error) {
        console.log(error)
    }


    return Response.json({success: body});
}


