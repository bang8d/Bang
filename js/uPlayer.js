(function ($) {
  "use strict";
  /*jslint plusplus: true */
  /*jslint browser: true*/
  /*jslint newcap: true */
  /*global $, jQuery, alert, case*/
  /*jslint evil: true */
  /*global console */
  $.fn.uPlayer = function (options) {
    options = $.extend({
      theme: "dark",
      width: null,
      scrollAutoplay: false,
      video: null,
      poster: "img/default_poster.jpg",
      heading: null,
      subheading: null,
      playlist: null,
      ads: false,
      adsSkip: 0,
      adsUrl: null
    }, options);
    
    var make = function (wrapper) {
      var html = {
        video_wrapper:
          '<div class="wpup_video_wrapper">' +
          '</div>',
        video:
          '<video class="wpup_video"></video>',
        ads_skip:
          '<div class="wpup_ads_skip">You can skip<br>ads after:<br><b></b></div>',
        title:
          '<div class="wpup_title">' +
            '<div class="wpup_heading"><span></span></div>' +
            '<div class="wpup_subheading"><span></span></div>' +
          '</div>',
        playback_status:
          '<div class="wpup_playback_status">' +
            '<svg id="wpup_playing" width="100px" height="100px">' +
              '<path d="M4,4 96,48 4,96z"></path>' +
              '<path d="M4,4 96,48 4,96z"></path>' +
            '</svg>' +
            '<svg id="wpup_paused" width="100px" height="100px">' +
              '<path class="wpup_pl_w" d="M10,4 10,96"></path>' +
              '<path class="wpup_pl_b" d="M10,4 10,96"></path>' +
              '<path class="wpup_pr_w" d="M90,4 90,96"></path>' +
              '<path class="wpup_pr_b" d="M90,4 90,96"></path>' +
            '</svg>' +
            '<svg id="wpup_loader" viewBox="0 0 100 100" width="100px" height="100px">' +
              '<circle cx="50" cy="50" r="47"></circle>' +
              '<circle cx="50" cy="50" r="47"></circle>' +
            '</svg>' +
          '</div>',
        playlist:
          '<div class="wpup_pls_wrapper">' +
            '<div class="wpup_scroll_wrapper"><div class="wpup_scroll_handle"></div></div>' +
            '<ul class="wpup_pls_list">' +
            '</ul>' +
          '</div>',
        coming:
          '<div class="wpup_coming_wrapper">' +
            '<div class="wpup_coming_heading"><span>Next</span></div>' +
            '<div class="wpup_coming_subheading"><span>Custom Title</span></div>' +
          '</div>',
        controls:
          '<div class="wpup_controls">' +
          '</div>',
        playback:
          '<div class="wpup_playback wpup_btn">' +
            '<svg version="1.1" id="wpup_playback" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">' +
              '<path d="M11,11 29,20 11,29z" class="wpup_play"/>' +
              '<path d="M28,12 28,28" class="wpup_pause"/>' +
            '</svg>' +
          '</div>',
        volume:
          '<div class="wpup_volume">' +
            '<div class="wpup_volume_bar wpup_fill"></div>' +
            '<div class="wpup_volume_bar wpup_fill"></div>' +
            '<div class="wpup_volume_bar wpup_fill"></div>' +
            '<div class="wpup_volume_bar wpup_fill"></div>' +
            '<div class="wpup_volume_bar wpup_fill"></div>' +
          '</div>',
        prev:
          '<div class="wpup_prev wpup_btn">' +
            '<svg version="1.1" id="wpup_prev" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">' +
              '<path d="M29,11 11,20, 29,29z M11,11, 11,29"></path>' +
            '</svg>' +
          '</div>',
        seek:
          '<div class="wpup_seek">' +
            '<div class="wpup_buffer"></div>' +
            '<div class="wpup_progress"></div>' +
            '<div class="wpup_current"></div>' +
            '<div class="wpup_duration"></div>' +
          '</div>',
        next:
          '<div class="wpup_next wpup_btn">' +
            '<svg version="1.1" id="wpup_next" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">' +
              '<path d="M11,11 29,20, 11,29z M29,11, 29,29"></path>' +
            '</svg>' +
          '</div>',
        pls:
          '<div class="wpup_pls wpup_btn">' +
            '<svg version="1.1" id="wpup_pls" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">' +
              '<path d="M10,12 30,12 M10,20 30,20 M10,28 30,28"></path>' +
            '</svg>' +
          '</div>',
        fullscreen:
          '<div class="wpup_fullscreen wpup_btn">' +
            '<svg version="1.1" id="wpup_fullscreen" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">' +
              '<path d="M10,16 10,10 16,10 M24,10 30,10 30,16 M30,24 30,30 24,30 M16,30 10,30 10,24"/>' +
            '</svg>' +
          '</div>'
      },
        player = {
          video_wrapper: null,
          video: null,
          adsSkip: null,
          controls: null,
          playback_status: null,
          title: null,
          heading: null,
          subheading: null,
          coming_wrapper: null,
          coming_subheading: null,
          playback: null,
          volume_bar: null,
          seek: null,
          buffer: null,
          progress: null,
          current: null,
          duration: null,
          prev: null,
          next: null,
          pls: null,
          playlistWrapper: null,
          scroll_handle: null,
          scroll_wrapper: null,
          playlistList: null,
          playlistItem: null,
          playlistThumb: null,
          fullscreen: null,
          paramArray: [
            ".wpup_video_wrapper",
            ".wpup_video",
            ".wpup_ads_skip",
            ".wpup_controls",
            ".wpup_playback_status",
            ".wpup_title",
            ".wpup_heading>span",
            ".wpup_subheading>span",
            ".wpup_coming_wrapper",
            ".wpup_coming_subheading>span",
            ".wpup_playback",
            ".wpup_volume_bar",
            ".wpup_seek",
            ".wpup_buffer",
            ".wpup_progress",
            ".wpup_current",
            ".wpup_duration",
            ".wpup_prev",
            ".wpup_next",
            ".wpup_pls",
            ".wpup_pls_wrapper",
            ".wpup_scroll_handle",
            ".wpup_scroll_wrapper",
            ".wpup_pls_list",
            ".wpup_pls_item",
            ".wpup_pls_item_thumb",
            ".wpup_fullscreen"
          ],
          hasHours: false,
          seekSliding: false,
          adsBloked: false,
          curPlsVideo: 0,
          comingTimer: null,
          firstPlay: false
        },
        video,
        i = 0;
      
      // главный контейнер, добавляем ему класс и вставляем контенерры
      wrapper = $(this)
        .addClass("wpup_wrapper wpup_" + options.theme)
          .append(html.video_wrapper)
            .append(html.controls);
      
      // если указанна ширина, используем ее
      if (options.width) {
        wrapper.css("width", options.width);
      }
      
      player.video_wrapper = wrapper.find(".wpup_video_wrapper")
        .append(html.video)
          .append(html.ads_skip)
            .append(html.title)
              .append(html.playback_status);
      
      // если есть плейлист добовляем враппер
      if (options.playlist) {
        player.video_wrapper.append(html.playlist);
        player.video_wrapper.append(html.coming);
      }
      
      player.controls = wrapper.find(".wpup_controls")
        .append(html.playback)
          .append(html.volume)
            .append(html.seek);

      // если есть плейлист добовляем кнопки для плс
      if (options.playlist) {
        player.controls
          .append(html.prev)
              .append(html.next)
                .append(html.pls);
      }
      
      player.controls.append(html.fullscreen);
      
      // берем видео и устанвливаем постер
      player.video = wrapper.find(".wpup_video");
      video = player.video[0];
      
      
      // заполняем переменные
      $.each(player, function (index, value) {
        if (i !== player.paramArray.length) {
          player[index] = wrapper.find(player.paramArray[i]);
          i++;
        }
      });
      
      // переключение видео
      function toggleVideo(data) {
        player.playback_status.addClass("loading");
        // заменяем видео
        video.src = data.video;
        // загружаем видео
        video.load();
        video.currentTime = 0;
        // заполняем титры
		// если не заполнен берем с опшена
        if (data.heading) {
          data.heading = data.heading;
        } else {
          data.heading = options.heading;
        }
        if (data.subheading) {
          data.subheading = data.subheading;
        } else {
          data.subheading = options.subheading;
		}
        player.heading.text(data.heading);
        player.subheading.text(data.subheading);
        // если есть постер заполняем, нету ставим дефолтный
        if (data.poster) {
          video.poster = data.poster;
        } else {
          video.poster = options.poster;
        }
        if (options.playlist) {
          player.playlistItem.removeClass("playing");
          player.playlistItem.eq(player.curPlsVideo).addClass("playing");
        }
      }
      
      function createScrollBar() {
        // делаем проверку если плейлист не влазит создаем скролл, нет - убиваем
        if (player.playlistWrapper.height() < player.playlistList.height()) {
          // создаем скролл
          player.scroll_wrapper.slider({
            orientation: "vertical",
            range: false,
            classes: {
              "ui-slider": "wpup_slider slider_on",
              "ui-slider-handle": "wpup_slider_seek",
              "ui-slider-range": "wpup_slider_range"
            },
            min: 0,
            max: 100,
            value: 100,
            step: 0.01,
            slide: function (event, ui) {
              var heightWrapper = (player.scroll_wrapper.height() / 100) * (100 - ui.value),
                heightlist = (player.playlistList.height() / 100) * (100 - ui.value) - heightWrapper;
              player.scroll_handle.css({
                "top": heightWrapper,
                "margin-top": -0.4 * (100 - ui.value)
              });
              player.playlistList.css({
                "top": -heightlist
              });
            }
          });
        } else {
          player.scroll_wrapper.slider("destroy");
        }
        
      }
      
      // иницилизация
      function init() {
        player.playback_status.addClass("loading");
        player.current.text("00:00");
        player.duration.text("00:00");

        // создаем плейлист
        if (options.playlist) {
          $.each(options.playlist, function (index, value) {
            var heading, subheading, html;
			// если не заполнен берем с опшена
            if (value.heading) {
              heading = value.heading;
            } else {
			  heading = options.heading;
			}
            if (value.subheading) {
              subheading = value.subheading;
            } else {
			  subheading = options.subheading;
			}
            html =
              '<li class="wpup_pls_item">' +
              '<video src="' + value.video + '" preload="metadata" class="wpup_pls_item_thumb"></video>' +
              '<div class="wpup_pls_item_heading"><span>' + heading + '</span></div>' +
              '<div class="wpup_pls_item_subheading"><span>' + subheading + '</span></div>' +
              '</li>';
            player.playlistList.append(html);
          });
          
          player.playlistThumb = wrapper.find(".wpup_pls_item_thumb");
          player.playlistItem = wrapper.find(".wpup_pls_item");
          
          
          
          // спустя 5 сек выставляем текущее время равным 1/4 продолжительности и отключаем звук для каждого видео в плс
          setTimeout(function () {
            $.each(player.playlistThumb, function (index, value) {
              var thumbVideo = $(this)[0];
              thumbVideo.currentTime = thumbVideo.duration / 4;
              thumbVideo.muted = true;
            });
          }, 3000);
          
          // плейбак для превью при наведении
          player.playlistItem.hover(
            function () {
              var thumbVideo = $(this).find("video")[0];
              thumbVideo.play();
            },
            function () {
              var thumbVideo = $(this).find("video")[0];
              thumbVideo.pause();
            }
          );

          createScrollBar();
        }
        
        // если нету рекламы
        if (!options.ads) {
          if (!options.playlist) {
            toggleVideo(options);
          } else {
            toggleVideo(options.playlist[0]);
          }
        } else {
          var data = {
            video: options.adsUrl,
            poster: null,
            heading: options.heading,
            subheading: options.subheading
          };
  
          
          if (options.playlist) {
            data.poster = options.playlist[0].poster;
          } else {
            data.poster = options.poster;
          }
          toggleVideo(data);
          player.adsBloked = true;
          console.log("ads mode loaded");
        }
      }
      
      // конвертер времени
      function formatTime(seconds, hours) {
        var h, time, m, s;
        if (hours) {
          h = Math.floor(seconds / 3600);
          time = seconds - h * 3600;
          m = Math.floor(time / 60);
          s = Math.floor(time % 60);
          return h.lead0(2) + ":" + m.lead0(2) + ":" + s.lead0(2);
        } else {
          m = Math.floor(seconds / 60);
          s = Math.floor(seconds % 60);
          return m.lead0(2) + ":" + s.lead0(2);
        }
      }
      
      // функция проверки нужен ли 0 в начале
      Number.prototype.lead0 = function (n) {
        var nz = this.toString();
        while (nz.length < n) {
          nz = "0" + nz;
        }
        return nz;
      };
      
      // пауза/воспроизведение и подмена рекламмы
      function playback() {
        // если видео на паузе воспроизводим, если нет ставим на паузу
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
      
      // буферизация
      function onprogress() {
        //get the buffered ranges data
        var ranges = [], i;
        for (i = 0; i < video.buffered.length; i++) {
          ranges.push([
            video.buffered.start(i),
            video.buffered.end(i)
          ]);
        }
        //now iterate through the ranges and convert each set of timings
        //to a percentage position and width for the corresponding span
        for (i = 0; i < video.buffered.length; i++) {
          player.buffer.css("width", (100 / video.duration) * (ranges[i][1]) + '%');
        }
      }
      
      
      // переключение фулскрина
      function toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(video.ALLOW_KEYBOARD_INPUT);
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      }
      
      // Событие при изменениии режима
      function onfullscreenchange() {
        player.fullscreen.toggleClass("wpup_active");
        wrapper.toggleClass("wpup_fsm");
        player.seek.slider("value", video.currentTime);
        if (options.playlist) {
          createScrollBar();
        }
      }
      
      // автоплей при скроле
      function scrollAutoplay() {
        var scroll = $(window).scrollTop(),
          wrapperOffset = wrapper.offset().top,
          wrapperHeight = wrapper.height(),
          vissibleHalf = $(window).height() / 2;

        if (scroll > wrapperOffset - vissibleHalf && scroll < (wrapperOffset + vissibleHalf) - (wrapperHeight)) {
          if (!player.firstPlay) {
            video.play();
            player.firstPlay = true;
          }
        } else {
          video.pause();
        }
      }
      
      init();
            
      // события пользователя
      // клик по плейбаку
      player.playback.on("click", function () {
        playback();
      });
      
      // клик по видео
      player.video.on("click", function () {
        playback();
      });
    
      // 2 клика по видео
      player.video.on("dblclick", function () {
        toggleFullScreen();
      });
      
      // пропустить рекламму
      player.adsSkip.on("click", function () {
        if (!player.adsBloked) {
          player.adsSkip.hide();
          player.title.show();
          if (!options.playlist) {
            player.curPlsVideo = 0;
            video.pause();
            video.currentTime = 0;
            toggleVideo(options);
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
            toggleVideo(options.playlist[player.curPlsVideo]);
            video.play();
          }
        }
      });

      player.volume_bar.on("click", function () {
        var element = $(this),
          index = element.index(),
          i;
        switch (index) {
        case 0:
          video.volume = 0.2;
          break;
        case 1:
          video.volume = 0.4;
          break;
        case 2:
          video.volume = 0.6;
          break;
        case 3:
          video.volume = 0.8;
          break;
        case 4:
          video.volume = 1;
          break;
        }
      });
      
      // prev item pls
      player.prev.on("click", function () {
        if (!player.adsBloked) {
          if (player.curPlsVideo > 0) {
            player.adsSkip.hide();
            player.curPlsVideo--;
            video.currentTime = 0;
            toggleVideo(options.playlist[player.curPlsVideo]);
            video.play();
          } else {
            player.curPlsVideo = options.playlist.length - 1;
            video.currentTime = 0;
            toggleVideo(options.playlist[player.curPlsVideo]);
            video.play();
          }
        } else {
          player.adsSkip.hide();
          playback();
        }
      });
      
      // next item pls
      player.next.on("click", function () {
        if (!player.adsBloked) {
          if (player.curPlsVideo < options.playlist.length - 1) {
            player.adsSkip.hide();
            player.curPlsVideo++;
            video.currentTime = 0;
            toggleVideo(options.playlist[player.curPlsVideo]);
            video.play();
          } else {
            player.curPlsVideo = 0;
            video.currentTime = 0;
            toggleVideo(options.playlist[player.curPlsVideo]);
            video.play();
          }
        } else {
          playback();
        }
      });
      
      // show/hide pls
      player.pls.on("click", function () {
        player.playlistWrapper.toggleClass("open");
        player.pls.toggleClass("wpup_active");
      });
      
      
      // выбор итема с плейлиста
      player.playlistItem.on("click", function () {
        if (!player.adsBloked) {
          player.adsSkip.hide();
          player.curPlsVideo = $(this).index();
          video.pause();
          video.currentTime = 0;
          toggleVideo(options.playlist[player.curPlsVideo]);
          video.play();
        } else {
          player.curPlsVideo = $(this).index();
          playback();
        }
      });
      
      // ппереключение фулскрина
      player.fullscreen.on("click", function () {
        toggleFullScreen();
      });
      
      // показываем титры когда в фулскрине наводим мышь но контрол
      player.controls.hover(
        function () {
          if (wrapper.hasClass("wpup_fsm")) {
            player.title.addClass("show");
          }
        },
        function () {
          if (wrapper.hasClass("wpup_fsm")) {
            player.title.removeClass("show");
          }
        }
      );
      
      // события
      
      // события при ресайзе
      $(window).resize(function ($) {
        player.seek.slider("value", video.currentTime);
        if (options.playlist) {
          createScrollBar();
        }
      });

      // горячие кнопки hot keys
      $(window).keydown(function (eventObject) {
        var forward, backward;
        if ($(".wpup_wrapper").length < 2) {
          // плейбек от пробела
          if (eventObject.which === 32) {
            eventObject.preventDefault();
            playback();
          }
          // стрелка вправо перемотка вперед на 10 сек
          if (eventObject.which === 39) {
            forward = video.currentTime + 10;
            if (!player.adsBloked) {
              video.currentTime = forward;
            }
          }
          // стрелка влево перемотка назад на 10 сек
          if (eventObject.which === 37) {
            backward = video.currentTime - 10;
            if (!player.adsBloked) {
              video.currentTime = backward;
            }
          }
          // стрелка вверх громкость +20
          if (eventObject.which === 38) {
            eventObject.preventDefault();
            if (video.volume < 1) {
              video.volume = (video.volume + 0.2).toFixed(2);
            }
          }
          // стрелка вниз громкость -20
          if (eventObject.which === 40) {
            eventObject.preventDefault();
            if (video.volume > 0) {
              video.volume = (video.volume - 0.2).toFixed(2);
            }
          }
        }
        
      });

      // скролл громкость
      wrapper.on("mousewheel", function (e) {
        if (e.originalEvent.wheelDelta > 0) {
          if (video.volume < 1) {
            video.volume = (video.volume + 0.05).toFixed(2);
          }
        } else {
          if (video.volume > 0) {
            video.volume = (video.volume - 0.05).toFixed(2);
          }
        }
      });
      
      // события видео
      video.addEventListener("canplay", function () {
        player.hasHours = (video.duration / 3600) >= 1.0;
        player.current.text(formatTime(0, player.hasHours));
        player.duration.text(formatTime(video.duration, player.hasHours));
        player.playback_status.removeClass("loading");
        
        // создаем слайдер перемотки
        player.seek.slider({
          value: 0,
          step: 0.01,
          orientation: "horizontal",
          range: false,
          max: video.duration,
          classes: {
            "ui-slider": "wpup_slider",
            "ui-slider-handle": "wpup_slider_seek",
            "ui-slider-range": "wpup_slider_range"
          },
          start: function (e, ui) {
            player.seekSliding = true;
          },
          slide: function (e, ui) {
            var progress = ui.value / video.duration;
            player.progress.css("width", progress * player.seek.width() + "px");
            player.current.text(formatTime(ui.value, player.hasHours));
            player.current.css("left", progress * player.seek.width() - (player.current.width() + 10) + "px");
            player.duration.css("right", player.seek.width() - (progress * player.seek.width()) - (player.current.width() + 10) + "px");
          },
          stop: function (e, ui) {
            player.seekSliding = false;
            if (!player.adsBloked) {
              video.currentTime = ui.value;
            }
            player.current.animate({"left": 10 + "px"}, 250);
            player.duration.animate({"right": 10 + "px"}, 250);
          },
          change: function (e, ui) {
            player.current.text(formatTime(ui.value, player.hasHours));
            var progress = ui.value / video.duration;
            player.progress.css("width", progress * player.seek.width() + "px");
          }
        });
        
        // при изменении текущего времени
        video.addEventListener("timeupdate", function () {
          if (!player.seekSliding) {
            player.seek.slider('value', video.currentTime);
            onprogress();
          }
          if (player.adsBloked) {
            player.playlistWrapper.removeClass("open");
            player.title.hide();
            player.pls.removeClass("wpup_active");
            player.adsSkip.show();
            if (options.adsSkip - video.currentTime > 0) {
              player.adsSkip.find("b").text(formatTime(options.adsSkip - video.currentTime, false) + " sec.");
            } else {
              player.adsSkip.text("skip").addClass("wpup_skip");
              player.adsBloked = false;
            }
          }
        }, false);
        
        // при изменении громкости
        video.addEventListener("volumechange", function () {
          switch (video.volume) {
          case 0:
            player.volume_bar.eq(0).removeClass("wpup_fill");
            player.volume_bar.eq(1).removeClass("wpup_fill");
            player.volume_bar.eq(2).removeClass("wpup_fill");
            player.volume_bar.eq(3).removeClass("wpup_fill");
            player.volume_bar.eq(4).removeClass("wpup_fill");
            break;
          case 0.2:
            player.volume_bar.eq(0).addClass("wpup_fill");
            player.volume_bar.eq(1).removeClass("wpup_fill");
            player.volume_bar.eq(2).removeClass("wpup_fill");
            player.volume_bar.eq(3).removeClass("wpup_fill");
            player.volume_bar.eq(4).removeClass("wpup_fill");
            break;
          case 0.4:
            player.volume_bar.eq(0).addClass("wpup_fill");
            player.volume_bar.eq(1).addClass("wpup_fill");
            player.volume_bar.eq(2).removeClass("wpup_fill");
            player.volume_bar.eq(3).removeClass("wpup_fill");
            player.volume_bar.eq(4).removeClass("wpup_fill");
            break;
          case 0.6:
            player.volume_bar.eq(0).addClass("wpup_fill");
            player.volume_bar.eq(1).addClass("wpup_fill");
            player.volume_bar.eq(2).addClass("wpup_fill");
            player.volume_bar.eq(3).removeClass("wpup_fill");
            player.volume_bar.eq(4).removeClass("wpup_fill");
            break;
          case 0.8:
            player.volume_bar.eq(0).addClass("wpup_fill");
            player.volume_bar.eq(1).addClass("wpup_fill");
            player.volume_bar.eq(2).addClass("wpup_fill");
            player.volume_bar.eq(3).addClass("wpup_fill");
            player.volume_bar.eq(4).removeClass("wpup_fill");
            break;
          case 1:
            player.volume_bar.eq(0).addClass("wpup_fill");
            player.volume_bar.eq(1).addClass("wpup_fill");
            player.volume_bar.eq(2).addClass("wpup_fill");
            player.volume_bar.eq(3).addClass("wpup_fill");
            player.volume_bar.eq(4).addClass("wpup_fill");
            break;
          }
        }, false);
        
      }, false);
      
      // буфферизация
      video.addEventListener("progress", function (e) {
        onprogress();
      }, false);
      
      
      // буфферизация
      video.addEventListener("loadedmetadata", function (e) {
        onprogress();
        // console.log("loadedmetadata");
      }, false);

      // playing
      video.addEventListener("playing", function (e) {
        // выключаем все видео кроме текущего
        $("video").each(function () {
          if (!$(this)[0].paused) {
            if ($(this)[0].src !== video.src) {
              $(this)[0].pause();
            }
          }
        });
        console.log("playing");
        // выводим кнопку паузы
        player.playback_status.removeClass("loading");
        player.playback.addClass("wpup_active");
        player.playback_status.addClass("playing");
        player.video_wrapper.addClass("flash");
        player.playback_status.removeClass("paused");
        // запускаем таймер для некст видео титра
        if (options.playlist) {
          if (options.adsUrl !== video.src) {
            if (player.curPlsVideo < options.playlist.length - 1) {
              // считаем через сколько запустить
              player.coming_wrapper.removeClass("show");
              clearTimeout(player.comingTimer);
              var timer = (video.duration - video.currentTime - 15).toFixed(0) * 1000;

              player.comingTimer = setTimeout(function () {
                if (options.ads && options.adsUrl === video.src) {
                  player.coming_subheading.text(options.playlist[player.curPlsVideo].subheading + " | " + options.playlist[player.curPlsVideo].heading);
                } else {
                  player.coming_subheading.text(options.playlist[player.curPlsVideo + 1].subheading + " | " + options.playlist[player.curPlsVideo + 1].heading);
                }
                player.coming_wrapper.addClass("show");
              }, timer);
            } else {
              console.log("last item in pls");
            }
          }
        }
      }, false);

      // play
      video.addEventListener("play", function (e) {
        // console.log("play");
      }, false);

      // pause
      video.addEventListener("pause", function (e) {
        // console.log("pause");
        // возвращаем кнопку плей
        player.playback.removeClass("wpup_active");
        player.playback_status.removeClass("playing");
        player.video_wrapper.removeClass("flash");
        player.playback_status.addClass("paused");
        // удаляем таймер для некст видео титра
        clearTimeout(player.comingTimer);
        player.coming_wrapper.removeClass("show");
      }, false);

      // seeked
      video.addEventListener("seeked", function (e) {
        player.playback_status.removeClass("loading");
        // console.log("seeked");
      }, false);

      // seeking
      video.addEventListener("seeking", function (e) {
        player.playback_status.addClass("loading");
        // console.log("seeking");
      }, false);
      
      // ended
      video.addEventListener("ended", function (e) {
        // console.log("ended");
        player.video_wrapper.removeClass("flash");
        // если есть плейлист
        if (options.ads && options.adsUrl === video.src) {
          player.adsSkip.hide();
          player.curPlsVideo--;
        }
        if (options.playlist) {
          console.log("before toglle = " + player.curPlsVideo);
          if (player.curPlsVideo < options.playlist.length - 1) {
            player.curPlsVideo++;
            video.currentTime = 0;
            toggleVideo(options.playlist[player.curPlsVideo]);
            console.log("after toglle = " + player.curPlsVideo);
            video.play();
          } else {
            player.curPlsVideo = 0;
            toggleVideo(options.playlist[player.curPlsVideo]);
            toggleFullScreen();
          }
        } else {
          if (options.ads && options.adsUrl === video.src) {
            player.adsBloked = false;
            player.adsSkip.hide();
            video.currentTime = 0;
            toggleVideo(options);
            player.title.show();
            video.play();
          } else {
            toggleVideo(options);
          }
        }
      }, false);
      
      video.addEventListener("emptied", function () {
        // console.log("Video reset");
        player.playback_status.addClass("loading");
      }, false);
      
      video.addEventListener("waiting", function () {
        console.log("Player waited for content");
        player.playback_status.addClass("loading");
      }, false);
      
      video.addEventListener("stalled", function () {
        console.log("Media data is not available");
      }, false);
      
      // canplaythrough
      video.addEventListener("canplaythrough", function (e) {
        console.log("Ready to play whole video");
        player.playback_status.removeClass("loading");
        // если включен автоплей при скролле, прослушиваем
        if (options.scrollAutoplay) {
          // автовоспроизведение при скролле
          window.addEventListener('scroll', scrollAutoplay, false);
          window.addEventListener('resize', scrollAutoplay, false);
        }
      }, false);
      
      // Событие об изменениии fullscreen режима
      video.addEventListener("webkitfullscreenchange", onfullscreenchange);
      video.addEventListener("mozfullscreenchange",    onfullscreenchange);
      video.addEventListener("fullscreenchange",       onfullscreenchange);
      
    };
    
    return this.each(make);
    
  };
}(jQuery));