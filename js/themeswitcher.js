const themeButtonEl = document.querySelector(".theme_button");
//const themeButtonNameEl = document.querySelector(".theme_button .theme_name");
const body = document.querySelector("body");
//const overlayEl = document.querySelector(".overlay");
const themes = ["black_theme", "red_theme", "blue_theme", "ikea_theme"]; // Lijst van thema's
let selectedTheme;

/* ### WHEN PAGE CONTENT IS LOADED, SET THEME AND THEN HIDE LOADING SCREEN */
document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("theme")) {
        selectedTheme = localStorage.getItem("theme");
        body.classList.toggle(selectedTheme);
        //themeButtonNameEl.innerHTML = (" " + selectedTheme).replace(null, "default");
    }

	/*if(overlayEl) {
		overlayEl.classList.add("hidden");
	}*/
});

/* ### WHEN USER CLICKS ON THEME BUTTON */
if(themeButtonEl) {
    themeButtonEl.addEventListener("click", function() {
        for(let i = 0; i < themes.length; i++) {
            if(selectedTheme && selectedTheme != themes[i]) {
                continue;
            }
            let element = themes[i];
            if(body.classList.contains(element) && ((i + 1) < themes.length)) {
                body.classList.toggle(element); //alert(element);
		body.classList.toggle(themes[i + 1]);  //alert(themes[i + 1]);
		selectedTheme = themes[i + 1];
                //alert("1: " + body.classList);
		break;
            } else if(body.classList.contains(themes[themes.length - 1])) {
                body.classList.toggle(themes[themes.length - 1]);
                selectedTheme = null;
                //alert("2: " + body.classList);
		break;
            } else {
                body.classList.toggle(themes[0]);
                selectedTheme = themes[0];
                //alert("3: " + body.classList);
		break;
            }
        }
        /*themeButtonNameEl.innerHTML = selectedTheme;

	themeButtonNameEl.innerHTML = (" " + selectedTheme).replace(null, "default");*/
        if(selectedTheme == null) {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem("theme", selectedTheme);
        }
    });
}

/* ### DO NOT CLOSE DROPDOWN WHILE CHANGING SETTINGS */
$(function() {

  $('.dropdown-toggle').on('click', function(event) {
    $('.dropdown-menu').slideToggle();
    event.stopPropagation();
  });

  $('.dropdown-menu').on('click', function(event) {
    event.stopPropagation();
  });

  $(window).on('click', function() {
    $('.dropdown-menu').slideUp();
  });

});