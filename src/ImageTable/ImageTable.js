import React, {useEffect, useState} from 'react';
import imageData from './test.json';
import EditImageForm from './EditImageForm';
const ImageTable = (props) => {

    const [images, setImages] = useState([]);
    const [editImageIndex, setEditImageIndex] = useState(null);

    useEffect(() => {
        setImages(imageData);
    }, []);

    const writeFile = async (images) => {
        const data = await fetch('http://localhost:9615', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(images)
        });
        console.log(data);
    }

    const handleEditImage = (e, index) => {
        e.preventDefault();
        setEditImageIndex(index);
    }

    const closeModal = () => {
        setEditImageIndex(null);
    }

    const editImage = (image) => {
        const newImages = [...images];
        newImages[editImageIndex] = image;
        setImages(newImages);
        writeFile(newImages);
        closeModal();
    }
    return (    
    <div className="ImageTable dark:bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-5 min-h-screen">
        <h1 className="text-center text-2xl font-bold text-slate-200">Image Table</h1>
        <h6 className="text-center text-sm text-neutral-500 font-medium text-slate-200 mb-3">(Click on a row to edit image data)</h6>
        <table className="table-auto border-collapse border border-slate-500 text-xs text-slate-200 w-full h-full">
            <thead>
                <tr className="bg-slate-500">
                    <th className="border border-slate-200 text-center">Id</th>
                    <th className="border border-slate-200 text-center">Image</th>
                    <th className="border border-slate-200 text-center">File name</th>
                    <th className="border border-slate-200 text-center">File size</th>
                    <th className="border border-slate-200 text-center">Procesed</th>
                    <th className="border border-slate-200 text-center">Views</th>
                    <th className="border border-slate-200 text-center">Comments</th>
                    <th className="border border-slate-200 text-center">Updated At</th>
                </tr>
            </thead>
            <tbody>
            {images.map((image, i) => (
                <tr key={image.id} className={`cursor-pointer  ${image.processed? 'bg-neutral-500':'bg-transparent'}`} onClick={(e) => handleEditImage(e, i)} >
                    <td className="border border-slate-200 text-center">{image.id}</td>
                    <td className="border border-slate-200 text-center  min-w-[10rem]">
                        <img className="object-contain m-auto" src={image.image} alt={image.file_name} />
                    </td>
                    <td className="border border-slate-200">{image.file_name}</td>
                    <td className="border border-slate-200">{image.file_size}</td>
                    <td className="border border-slate-200">{String(image.processed)}</td>
                    <td className="border border-slate-200">{image.views}</td>
                    <td className="border border-slate-200">{image.comments}</td>
                    <td className="border border-slate-200">{image.updated_at}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {editImageIndex !== null && <EditImageForm onClose={closeModal} onSubmit={editImage} imageProp={images[editImageIndex]} />}

    </div>
    );
    }
export default ImageTable;