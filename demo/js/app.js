class Application {

    constructor() {
        this.initTpl()
    }

    initTpl() {
        this.tpl = `
            <div class="d-root grey lighten-4">
                <div class="container">
                    <div class="row">
                        <div class="col s12 m4 d-side-bar">
                            <div class="col s12 m10 offset-m1 white z-depth-1">
                                <div class="row green lighten-1 white-text d-avatar valign-wrapper">
                                    <h2 class="col s12 center">Avatar</h2>
                                </div>
                                <div class="row d-description">
                                    <div class="col s12">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <br/>
                                    </div>
                                    <div class="col s12">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <br/>
                                    </div>
                                    <div class="col s12">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <br/>
                                    </div>
                                    <div class="col s12">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <br/>
                                    </div>
                                    <div class="col s12">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m8">
                            <div class="col s12 white z-depth-1">
                                <h1 class="col s10 offset-s1 d-title">Profile Form</h1>

                                <div class="col s10 offset-s1">
                                    <div class="input-field col s12">
                                        <input placeholder="First name" id="first_name" type="text" class="validate">
                                        <label for="first_name" class="active">First Name</label>
                                    </div>
                                    <div class="input-field col s12">
                                      <input placeholder="Last name" id="last_name" type="text" class="validate">
                                      <label for="last_name" class="active">Last Name</label>
                                    </div>
                                    <div class="input-field col s12">
                                      <input id="email" type="email" class="validate">
                                      <label for="email" class="active">Email</label>
                                    </div>
                                    <div class="input-field col s12">
                                      <input id="password" type="password" class="validate">
                                      <label for="password" class="active">Password</label>
                                    </div>
                                </div>

                                <div class="col s10 offset-s1 d-buttons">
                                    <div class="right">
                                        <button class="btn-flat waves-effect waves-light grey darken-3 white-text">Reset</button>
                                        <button class="btn-flat waves-effect waves-light orange darken-3 white-text">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        document.getElementById("root").innerHTML = this.tpl
    }
}

new Application().render();