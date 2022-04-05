import React, {useEffect, useState} from "react";

const EditImageForm = (props) => {
    let {imageProp, onClose, onSubmit} = props;
    const [image, setImage] = useState({
        id: '',
        file_name: '',
        file_size: '',
        processed: false,
        views: 0,
        comments: '',
        updated_at: ''
    });

    useEffect(() => {
        setImage(imageProp);
    }, [imageProp]);

    const closeModal = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(image);
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const type = target.type;
        const name = target.name;
        const value = type === 'number' ? Number(target.value) : target.value;
        if(name === 'processed'){
            setImage({...image, 'processed': Boolean(target.checked), updated_at: new Date().toISOString()});
        }else{
            setImage({...image, [name]: value, updated_at: new Date().toISOString()});
        }
      };
    

    return (<>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-900/50"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl  min-w-[50%]">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex justify-center items-center py-2 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">{`Edit Image: ${image.id}`}</h3>
                <div className="ml-3">
                    <img src={image.image} alt={image.file_name} className="object-contain m-auto w-[100px] h-[80px]" />
                </div>
              </div>
              <div className="relative p-6 flex-auto">
                <form className="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="sm:flex items-center">
                        <label htmlFor="id" className="text-sm font-medium leading-5 text-gray-700 mr-2">
                            Id:
                        </label>
                        <input
                            id="id"
                            name="id"
                            type="text"
                            className="form-input py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            value={image.id}
                            readOnly
                        />
                        <label htmlFor="filename" className="text-sm font-medium leading-5 text-gray-700 mx-1"> File Name </label>
                        <input
                            id="filename"
                            name="filename"
                            type="text"
                            className="form-input py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            value={image.file_name}
                            readOnly
                        />
                        <label htmlFor="file_size" className="text-sm font-medium leading-5 text-gray-700 mx-1"> File Size </label>
                        <input
                            id="file_size"
                            name="file_size"
                            type="text"
                            className="form-input py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            value={image.file_size}
                            readOnly
                        />
                    </div>
                    <div className="flex items-center mt-2">
                        <label htmlFor="Views" className="text-sm font-medium leading-5 text-gray-700 mr-2"> Views </label>
                        <input
                            id="views"
                            name="views"
                            type="number"
                            className="grow form-input py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
                            value={image.views}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex items-start mt-2">
                        <label htmlFor="comments" className="text-sm font-medium leading-5 text-gray-700 mr-2"> Comments </label>
                        <textarea value={image.comments}  rows={10} name="comments" id="comments"
                        onChange={handleInputChange}
                        className="grow h-auto border border-gray-300 rounded-md py-2 px-3" />
                    </div>
                    <div className="flex items-center mt-2">
                        <label htmlFor="processedCheck" className="text-sm font-medium leading-5 text-gray-700 mr-2"> Processed </label>
                        <input
                            id="processedCheck"
                            name="processed"
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            checked={image.processed}
                            onChange={handleInputChange}
                        />

                    </div>
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => closeModal(e)}
                >
                  Close
                </button>
                <button
                    onClick={(e) => handleSubmit(e)}
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>);
}
export default EditImageForm;