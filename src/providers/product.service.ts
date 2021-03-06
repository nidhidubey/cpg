
import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { BASEURL } from './app.constants';

@Injectable()
export class ProductService {

    constructor(
        private http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }

    // getProducts() {
    //     return [
    //         {
    //             img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/1/_/1_2.jpg',
    //             name: 'Dr. Aquaguard Magna NXT HD RO', category: 'Water Purifier', regDate: 'Sep 12,2016', purDate: 'Jun 4 2016', warranty: '2 years', regNo: 'AD12345', mrp: ' Rs 16,990',
    //             status: 'NotScheduled', dealer: { name: 'Lotus Dealers Pvt Ltd', address: 'Noida Sec 3', phone: '9874563214' }
    //         },
    //         {
    //             img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/e/u/eureka_forbes_vc-7023-min_1.jpg',
    //             name: 'Euro Health Clean', category: 'Vaccum Cleaner', regDate: 'Oct 12,2015', purDate: 'Jun 4 2014', warranty: '1 years', regNo: 'AD12347', mrp: ' Rs 6,990',
    //             status: 'Scheduled', dealer: { name: 'American Dealers Pvt Ltd', address: 'Gurugram Sec 3', phone: '9833563214' },
    //             scheduledDate: '22 Jun, 2018'
    //         },
    //         {
    //             img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/s/c/scpr300.jpg',
    //             name: 'Dr. Aeroguard SCPR 300', category: 'Air Purifier', regDate: 'Oct 12,2013', purDate: 'Jun 4 2013', warranty: '1 years', regNo: 'AD12347', mrp: ' Rs 13,990',
    //             status: 'Installed', dealer: { name: 'Sufik Dealers Pvt Ltd', address: 'Gurugram Sec 45', phone: '9133563214' },
    //             installedDate: '22 Jun, 2018',
    //             scheduledDate: '22 Jun, 2018'
    //         },
    //         {
    //             img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTpSo_YJ46Qb7nGdH88YXc8M5HCNUo7fv-nrAhhsJjCVvY0Xuvr_GPKybVvBA&usqp=CAc ',
    //             name: 'Eurovigil I Deter 100 (Biometric Access Control System)', category: 'Security Solutions', regDate: 'Oct 12,2013', purDate: 'Oct 4 2016', warranty: '5 years', regNo: 'AD12347', mrp: ' Rs 111,990',
    //             status: 'ProblemInInstallation', dealer: { name: 'Security & Safety', address: 'Rohini Sec 45', phone: '9133563214' },
    //             scheduledDate: '25 Jun, 2018'
    //         },
    //     ];
    // }

    getProducts(){
return this.http.get('/c/registered-product');
    }

// requests related to product register
    getInfoForProductRegister() {
        return this.http.get('/c/register-product/save-info');
    }

    getCategoryTypes(cId: number) {
        return this.http.get(`/c/product-type/${cId}`);
    }    

    getProductId(bId: number, typeId: number) {
        return this.http.get(`/c/product?brandId=${bId}&typeId=${typeId}`);
    }

    getProductIdUsingBarcode(barCode: string) {
        return this.http.get(`/c/product?barcode=${barCode}`);
    }

    registerProductWithoutBill(data: any) {
        return this.http.post(`/c/register-product`, data);
    }

    registerProductWithBill(data: any, image: any) {
        let myFileName: string = this.generateImageName();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: myFileName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            httpMethod: "POST",
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        }
        options.params = data;
        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(image, BASEURL + `/c/register-product`, options, false)
    }

    generateImageName() {
        //generate unique imagename based on current date-time(upto seconds)
        let date = new Date().toISOString();
        return 'IMG_' + date.substring(0, date.indexOf('.')) + '.jpg';
    }

}

