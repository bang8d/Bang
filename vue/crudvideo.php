<?php
/**
 * Créer avec PhpStorm.
 * Auteur: mmont
 * Date: 21/11/2016
 * Heure: 16:14
 */
include 'dao/dbconnect.php';
include 'dao/admin.php'
?>
<link rel="stylesheet" href="/css/flat-ui.css" type="text/css" charset="UTF-8"/>
<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.2/css/uikit.almost-flat.css'>
<link rel="stylesheet" href="/css/admindetail.css" type="text/css" charset="utf-8"/>

</head>
<body style="padding-left: 60px;"><sidebar id="left-menu" class="left-menu">
    <ul class="uk-text-center">
        <li style="width: 60px;">
            <a href="#" id="expand" class="left-menu-nav-icon">
                <i class="uk-icon-navicon"></i>
            </a>
        </li>
        <li>
            <a href="?p=crudVideo">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
                <span>Vidéo</span>
            </a>
        </li>
        <li>
            <a href="?p=crudUser">
                <i class="fa fa-user" aria-hidden="true"></i>
                <span>Utilisateur</span>
            </a>
        </li>
    </ul>
</sidebar>
<section id="menuDeGuez">
    <div class="container">
        <a class="btn color-2" onclick="showAjoutCategorie()">Ajout de catégorie</a>
        <a class="btn color-2" onclick="showAjoutSerie()">Ajout de série</a>
        <a class="btn color-2" onclick="showAjoutSaison()">Ajout de saison</a>
        <a class="btn color-2" onclick="showAjoutClip()">Ajout de clip</a>
        <a class="btn color-2" onclick="showAjoutEpisode()">Ajout d'épisode</a>
    </div>
</section>
<section id="tonGrandPere">
    <div class="container">
        <h2>Catégorie</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Libelle</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
<?php
$requete = $bdd->prepare('SELECT id, libelle FROM categorie');
$requete->execute();
while($resultat = $requete->fetch()){
    echo '<tr>';
    echo '<td>'.$resultat['id'].'</td>';
    echo '<td>'.$resultat['libelle'].'</td>';
    echo '<td> <a onclick="modifCategorie"><i class="fa fa-pencil" aria-hidden="true"></i></a><a onclick="supprCategorie"><i class="fa fa-trash" aria-hidden="true"></i></a>';
    echo '</tr>';
}
?>
            </tbody>
        </table><br/>
    </div>
    <div class="container">
        <h2>Film</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="container">
        <h2>Série</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="container">
        <h2>Saison</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="container">
        <h2>Episode</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="container">
        <h2>Clip</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
            </tr>
            </tbody>
        </table>
    </div>
</section>
<section id="formAjoutCategorie" style="display: none;">
    <div class="container">
        <div class="col-md-3">
            <label for="titreCategorie">Titre de la catégorie : </label>
        </div>
        <div class="col-md-6">
            <input id="titreCategorie" type="text" placeholder="Entré le titre de la catégorie" class="form-control flat" /><br/>
            <a class="btn btn-success" onclick="ajoutCategorie()">Ajouter la catégorie</a>
        </div>
        <div id="ZoneConfirmation" class="col-md-3">

        </div>
    </div>
</section>
<section id="formAjoutSerie">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <label for="libelleSerie">Libellé de la série : </label>
            </div>
            <div class="col-md-6">
                <input id="libelleSerie" type="text" placeholder="Entré le libellé de la série" class="form-control flat" /><br/>

            </div>
            <div id="#" class="col-md-3">

            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label for="urlSerie">Image d'illustration  : </label>
            </div>
            <div class="col-md-6">
                <input id="libelleSerie" type="text" placeholder="Entré le libellé de la série" class="form-control flat" /><br/>
                <a class="btn btn-success" onclick="ajoutSerie()">Ajouter la série</a>
            </div>
            <div id="ZoneConfirmation" class="col-md-3">

            </div>
        </div>
    </div>
</section>
<section id="formAjoutSaison">

</section>
<section id="formAjoutClip">

</section>
<section id="formAjoutEpisode">

</section>
