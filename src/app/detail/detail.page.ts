import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Plugins, CameraResultType } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  user:any[]=[];
  public source:any;
  sourceArray:any[]=[];

  constructor(public activatedRoute: ActivatedRoute, public router: Router, private alertCtrl: AlertController,
    private DomSanitizationService: DomSanitizer) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }
    });
   }

  ngOnInit() {
    this.sourceArray=this.user["picture"];
    this.source=this.sourceArray["large"];
    console.log(this.source);
  }

  async openCamera(){
    const { Camera } = Plugins;
    
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.user["picture.large"] = imageUrl;
    let alert = this.alertCtrl.create({
      header: "New image",
      message: '<img src="'+imageUrl+'" class="alerta">',
      buttons: ['Aceptar']
    });
    (await alert).present();
    this.changeImg(imageUrl);

}
changeImg(path:string){
  this.source = this.DomSanitizationService.bypassSecurityTrustUrl(path);

}

}
