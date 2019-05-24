import axios from "axios";

const service = axios.create({
    baseURL: 'http://192.168.0.24:5000/api',
    //baseURL: 'http://localhost:3001',
});

const errorHandler = err => {
    throw err;
}

export default{
    service,

    getAlbuns(){
        return service.get('/album')
        .then(res => res.data)
        .catch(errorHandler);
    },

    getMusics(id){
        return service.get(`/album/${id}`)
        .then(res => res.data)
        .catch(errorHandler);
    },

    createAlbum(name, imageAlbum, description, artistId){
        return this.service.post(`/album/create/${artistId}`, {name, imageAlbum, description})
        .then(response => response.data)
    },
    
    searchAlbum(userId){
        return this.service.get(`/music/${userId}`)
        .then(res => res.data)
        .catch(errorHandler);
    },

    createMusics(name, duration, format, quality, audioUrl, albumId){
        return this.service.post(`/music/create/${albumId}`, {name, duration, format, quality, audioUrl})
        .then(res => res.data)
        .catch(errorHandler);
    },

    handleUpload(theFile){
        return this.service.post('/music/upload', theFile)
        .then(res => res.data)
    },

    handleUploadAlbum(theFile){
        return this.service.post('/album/upload', theFile)
        .then(res => res.data)
    },

    confirmationUser(confirmationCode){
        return this.service.get(`/spotify/confirm/${confirmationCode}`)
        .then (res => res.data)
        .catch( error => console.log(error))
    }
} 