<?php
/**
 * Créer avec PhpStorm.
 * Auteur: mmont
 * Date: 21/11/2016
 * Heure: 13:23
*/
if(!isset($_SESSION['utilisateur'])){
?>
    <section id="features" class="features">

        <div class="container">

            <div class="row">

                <div class="col-lg-12 text-center">

                    <div class="section-heading">

                        <h2><span class="font-onizuka">Administration</span></h2>

                        <p class="text-muted">



                        </p>

                        <hr>

                    </div>

                </div>

                <div class="col-lg-2"></div>

                <form class="form-horizontal">

                    <div class="form-group">

                        <label class="col-md-2 control-label" for="usernameAdmin">Nom d'utilisateur</label>

                        <div class="col-md-4">

                            <input id="usernameAdmin" name="usernameAdmin" type="text" placeholder="Nom d'utilisateur"  class="form-control input-md">

                        </div>

                    </div><br/>

                    <div class="col-lg-2"></div>

                    <div class="form-group">

                        <label class="col-md-2 control-label" for="passAdmin">Mot de passe</label>

                        <div class="col-md-4">

                            <input id="passAdmin" name="passAdmin" type="password" placeholder="Mot de passe"  class="form-control input-md">

                        </div>

                    </div>

                    <br/>

                    <div class="col-md-7">



                    </div>

                    <div class="col-md-2">

                        <button type="button" class="btn btn-success" onclick="testConnectionAdmin()">Valider</button>
                        <span id="ZoneConfirmation">BG</span>
                    </div>

                    <div class="col-md-3">



                    </div>

                </form>

            </div>

            <div class="row">

                <div class="col-md-12">



                </div>

            </div>

        </div>

    </section>


<?php
} else {
echo'cc';
}