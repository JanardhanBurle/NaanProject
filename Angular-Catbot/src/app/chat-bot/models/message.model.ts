
export class Message {
    endpoint: string;
    content: string;
    timestamp: Date;
    avatar: string;
    suggestions: any;
    upload_document: any;
    uploadedImg: any;
    datepicker: any;
    googleMap: any;
    constructor(content: string, avatar: string, endpoint: string, timestamp?: Date, payload?: any, upload_document?: any, uploadedImg?: any, datepicker?: any, googleMap?: any) {
        this.content = content;
        this.timestamp = timestamp;
        this.avatar = avatar;
        this.endpoint = endpoint;
        this.suggestions = payload;
        this.upload_document = upload_document;
        this.uploadedImg = uploadedImg;
        this.datepicker = datepicker;
        this.googleMap = googleMap;
    }
}