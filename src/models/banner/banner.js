
export default class BannerModel {
    constructor(data) {
        this.title = data.Title;
        this.description = data.ShortDescr;
        this.url = data.BannerURL;
        this.caption = data.ShowCaption;
        this.imageName = data.ImageName;
        this.imagepath = data.ImagePath;
    }
}

