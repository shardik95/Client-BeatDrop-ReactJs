import axios from 'axios';
let _singleton=Symbol()

class FileService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FileService(_singleton);
        return this[_singleton]
    }


    fileUpload(file,artistId){

        const url = 'https://beatdrop.herokuapp.com/api/file/'+artistId;
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  axios.post(url, formData,config)
    }

    deleteFile(filename,id){
        const url = 'https://beatdrop.herokuapp.com/api/file/'+filename+"/"+id;
        return fetch(url,{
            method:'delete'
        }).then(()=> "success")
    }

}

export default FileService