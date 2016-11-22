$('document').ready(function() {
    $('#expand').click(function() {
        if ($("#left-menu").hasClass("extended"))
        {
            $("#left-menu").removeClass('extended');
        }
        else
        {
            $("#left-menu").addClass('extended');
        }
    });
});

function showAjoutCategorie(){
    document.getElementById('tonGrandPere').style.display = 'none';
    document.getElementById('formAjoutSaison').style.display = 'none';
    document.getElementById('formAjoutClip').style.display = 'none';
    document.getElementById('formAjoutEpisode').style.display = 'none';
    document.getElementById('formAjoutSerie').style.display = 'none';
    document.getElementById('formAjoutCategorie').style.display = 'block';
}

function showAjoutSerie(){
    document.getElementById('tonGrandPere').style.display = 'none';
    document.getElementById('formAjoutCategorie').style.display = 'none';
    document.getElementById('formAjoutSaison').style.display = 'none';
    document.getElementById('formAjoutClip').style.display = 'none';
    document.getElementById('formAjoutEpisode').style.display = 'none';
    document.getElementById('formAjoutSerie').style.display = 'block';
}

function showAjoutSaison(){
    document.getElementById('tonGrandPere').style.display = 'none';
    document.getElementById('formAjoutCategorie').style.display = 'none';
    document.getElementById('formAjoutClip').style.display = 'none';
    document.getElementById('formAjoutEpisode').style.display = 'none';
    document.getElementById('formAjoutSaison').style.display = 'block';
}

function showAjoutClip(){
    document.getElementById('tonGrandPere').style.display = 'none';
    document.getElementById('formAjoutCategorie').style.display = 'none';
    document.getElementById('formAjoutSaison').style.display = 'none';
    document.getElementById('formAjoutEpisode').style.display = 'none';
    document.getElementById('formAjoutClip').style.display = 'block';
}

function showAjoutEpisode(){
    document.getElementById('tonGrandPere').style.display = 'none';
    document.getElementById('formAjoutCategorie').style.display = 'none';
    document.getElementById('formAjoutSaison').style.display = 'none';
    document.getElementById('formAjoutClip').style.display = 'none';
    document.getElementById('formAjoutEpisode').style.display = 'block';
}