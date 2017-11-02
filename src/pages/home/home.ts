import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public fb: Facebook) {}

    loginAction()
    {
        // Login with permissions
        this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
        .then( (res: FacebookLoginResponse) => {
    
            // The connection was successful
            if(res.status == "connected") {
    
                // Get user ID and Token
                var fb_id = res.authResponse.userID;
                var fb_token = res.authResponse.accessToken;
    
                // Get user infos from the API
                this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {
    
                    // Get the connected user details
                    var gender    = user.gender;
                    var birthday  = user.birthday;
                    var name      = user.name;
                    var email     = user.email;
    
                    console.log("=== USER INFOS ===");
                    console.log("Gender : " + gender);
                    console.log("Birthday : " + birthday);
                    console.log("Name : " + name);
                    console.log("Email : " + email);
    
                    // => Open user session and redirect to the next page
    
                });
    
            } 
            // An error occurred while loging-in
            else {
    
                console.log("An error occurred...");
    
            }
    
        })
        .catch((e) => {
            console.log('Error logging into Facebook', e);
        });
    }
}
