/*------------------------------------------------------------------------------
Function:       FunctionHandler()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  2009-04-02
Version:        0.2
Homepage:       http://github.com/easy-designs/FunctionHandler.js
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
(function($){var FunctionHandler={version:"0.2"},pages={};function initialize(){var body_id=$("body").attr("id");if(body_id!=false&&typeof(pages[body_id])!="undefined"){run(pages[body_id])}if(typeof(pages["*"])!="undefined"){run(pages["*"])}}$(document).ready(initialize);FunctionHandler.register=function(id,callback){if((typeof(id)!="string"&&!(id instanceof Array))||typeof(callback)!="function"){return false}if(typeof(id)=="string"&&id.indexOf(", ")!=-1){id=id.split(", ")}if(id instanceof Array){for(var i=id.length-1;i>=0;i--){add(id[i],callback)}}else{add(id,callback)}return true};function add(id,callback){if(typeof(pages[id])=="undefined"){pages[id]=[]}pages[id].push(callback)}function run(arr){if(!(arr instanceof Array)){return}for(var i=arr.length-1;i>=0;i--){arr[i]()}}window.FunctionHandler=FunctionHandler})(jQuery);

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


// make sure a user hitting the back button doesn't kill the layout
if ( window.addEventListener )
{
	window.addEventListener('pageshow',function(e){
		if (e.persisted)
		{
			setTimeout(function(){
				window.scrollTo(window.scrollX,window.scrollY+1);
			},10);
		}
	}, false);
}


// function to adjust the viewport
(function(win,doc){
  window.adjustViewport = function( property, value )
  {
  	var
  	$viewport = $('meta[name=viewport]'),
  	currently = $viewport.attr('content'),
  	o_props		=	currently.split(/\s,\s?/),
  	n_props		= [],
  	i					=	o_props.length,
  	set       = false;
  	while ( i-- )
  	{
  		o_props[i] = o_props[i].split(/\s?=\s?/);
  		if ( o_props[i][0] == property )
  		{
  			if ( value !== false )
  			{
  				o_props[i][1] = value;
  				n_props.push( o_props[i].join('=') );
  			}
  			set = true;
  		}
  		else
  		{
  			n_props.push( o_props[i].join('=') );
  		}
  	}
  	if ( ! set )
  	{
  		n_props.push(property+'='+value);
  	}
  	n_props = n_props.join(',');
  	$viewport.attr('content',n_props);
  };
})(window);


// create the maxContentHeight method
(function(win,doc){
	var
	$window		= $(win),
	$document	= $(doc),
	$content	= $('#content');

	window.maxContentHeight = function(){
		$content.css('min-height','0');
		var
		c_height	=	$content.height(),
		d_height	= $document.height(),
		w_height	=	$window.height(),
		p_height	= ( d_height > w_height ? d_height : w_height ) - 
								$('#ornament-1').outerHeight(true) -
								$('#bottom').outerHeight(true);
		if ( p_height > c_height )
		{
			$content.css('min-height',p_height+'px');
		}
	};
})(window,document);

// borrowed from modernizr
function supports3d()
{
	var
	doc		= document,
	props = ['perspectiveProperty', 'WebkitPerspective'],
	div		= doc.createElement('div'),
	ret		= false,
	i, st;
	
	for ( i = props.length - 1; i >= 0; i-- )
	{
		ret = ret ? ret : div.style[props[i]] != undefined;
		if ( ret ){ break; }
	};

	// webkit has 3d transforms disabled for chrome, though
	// it works fine in safari on leopard and snow leopard
	// as a result, it 'recognizes' the syntax and throws a false positive
	// thus we must do a more thorough check:
	if (ret)
	{
		st = doc.createElement('style');
		st.textContent = '@media (-webkit-transform-3d){#test3d{height:3px}}';
		st = $(st).appendTo('head');
		div = $(div)
						.attr('id','test3d')
						.appendTo('body');
		
		ret = div.height() === 3;
		
		st.remove();
		div.remove();
	}
	if ( navigator.userAgent.indexOf('Version/4') > -1 &&
       navigator.userAgent.indexOf('Safari') > -1 )
	{
		ret = false;
	}
	return ret;
}

// all page scripts
FunctionHandler.register(
	'*',
	function(){
		
		// If the browser supports the new HTML5 form stuff,
		// add a trigger to form elements that have been touched
		(function(doc){
			var
			input		= doc.createElement( 'input' ),
			trigger	=	'validate';
			input.setAttribute('type','email');
			if ( input.type == 'email' )
			{
				$('input, textarea, select')
					.blur(function(){
						var $this		= $(this);
						if ( ! $this.hasClass(trigger) &&
						 		 $this.val() != '' )
						{
							$this.addClass(trigger);
						}
					})
					.focus(function(){
						$(this).removeClass(trigger);
					});
			}
		})(document);
		
		if ( supports3d() )
		{
			$('html').addClass('has-3d');
		}
		
		// for iOS (remove the toolbar)
		if ( window.location.hash == '' )
		{
  			window.scrollTo(0, 1);
		}

		// set the content height to 100% of screen height
		maxContentHeight();
		var r_timer;
		$(window)
			.resize(function(){
				if ( r_timer ){
					clearTimeout( r_timer );
					r_timer = false;
				}
				r_timer = setTimeout( realResize, 50 );
			});
		function realResize()
		{
			clearTimeout( r_timer );
			r_timer = false;
			maxContentHeight();
		}
		
		// Small screen nav conversion
		(function(win){
		  // not on the reg-related pages
		  
			var
			page        = $('body').attr('id'),
			$window     = $(win),
			$document	  = $(document),
  		curr_page   = '',
  		autoScroll	= false,
      // get the existing navigation
			$old_nav = $('#top nav > *'),
			// new var to reduce the number of times we have to find() the links
			$links	 = $old_nav.find('a'),
			// we don't need to create the markup yet
			$new_nav, $option, $optgroup
			// track what's showing
			showing	 = 'old',
			// predefine the trigger size
			trigger  = 659,
			// we'll need a timer later
			timer		 = null;
			
			// don't execute this when on the reg page
			if ( page == 'register' ||
			     page == 'checkout' ||
			     page == 'thanks' ||
			     page == 'cancelled' )
			{
			  return;
			}
      
      // make sure the UL exists & it contains links
			if ( $old_nav.length &&
					 $links.length )
			{
				// now we can create the markup & assign event handlers
				$new_nav  =	$('<select></select>');
				$option   =	$('<option>-- Navigation --</option>')
											.appendTo($new_nav);
				$optgroup =	$('<optgroup></optgroup>');
				if ( window.location.toString().match(/\/events\/\d{4}\//) )
				{
				  $new_nav.append($optgroup.clone().attr('label','On This Page'));
				  $new_nav.append($optgroup.clone().attr('label','On This Site'));
          // event page
				  $links
  					.each(function(){
  						var $a = $(this);
  						$option
  							.clone()
  							.attr( 'value', $a.attr('href') )
  							.text( $a.text() )
  							.appendTo( ( $a.parents('#main-nav').length > 0 ) ? $new_nav.find('optgroup[label$=Site]')
  							                                                  : $new_nav.find('optgroup[label$=Page]') );
  					});
				}
				else
				{
				  // other pages
				  $links
  					.each(function(){
  						var $a = $(this);
  						$option
  							.clone()
  							.attr( 'value', $a.attr('href') )
  							.text( $a.text() )
  							.appendTo( $new_nav );
  					});
				}
				$new_nav	=	$new_nav
											.wrap('<div id="mobile-nav"/>')
											.parent()
											.delegate('select', 'change', function(){
												var $this = $(this);
												if ( $this.val().indexOf('#') != -1 )
												{
													scrollToArticle( $this.val().replace(/(#)\/(.*)/,'$1$2') );
												}
												else
												{
													window.location = $this.val();
												}
											});

				// our toggle function
				function toggleDisplay()
				{
					var width = $window.width();
					if ( showing == 'old' &&
						   width <= trigger )
					{
						$old_nav.replaceWith($new_nav);
						showing = 'new';
						adjustViewport('user-scalable','no');
					} else if ( showing == 'new' &&
											width > trigger ) {
						$new_nav.replaceWith($old_nav);
						showing = 'old';
						adjustViewport('user-scalable',false);
					}
				}
				// toggle it the first time
				toggleDisplay();

				// set up the toggle
				$window
					.resize(function(){
						if ( timer ) {
							clearTimeout(timer);
						}
						timer = setTimeout(toggleDisplay,100);
					});
			}
			
  		function defaultScrollCallback(){
  			window.location.hash = '#/' + curr_page;
  		};
			function scrollToArticle( selector, callback )
  		{
  			autoScroll = true;
  			var new_callback = function(){
  				curr_page = selector.replace('#','');
  				if ( callback )
  				{
  					callback();
  				}
  				else
  				{
  					defaultScrollCallback();
  				}
  				setTimeout(function(){
  					autoScroll = false;
  				},50);
  			};

  			$document.scrollTo(
  				selector,
  				500,
  				{
  					easing:		'swing',
  					onAfter:	new_callback
  				}
  			);
  		}
  		
		})(window)
		
	});
		

FunctionHandler.register(
	'event',
	function()
	{
		var
		$window		= $(window),
		$document	= $(document),
		TRUE			= true,
		FALSE			= false,

		// scroll-related variables
		link_count  = 0,
		hash				= window.location.hash,
		s_timer			= FALSE,
		curr_page		= 'details',
		curr_top		= 0,
		tops				= {},
		bottoms			= {},
		autoScroll	= FALSE;
		
		// Deal with navigation
		$('body').delegate('#content a[href^=#]', 'click', function(e){
			var
			id  = $(this).attr('href'),
			$el = $(id);
			if ( $el.length > 0 )
			{
  			e.preventDefault();
  			scrollToArticle( id );
  			// find the section to highlight
  			if ( $el.is(':not(article)') )
  			{
    			$el = $el.parents('article').eq(0);
  			}
  			$( 'li#nav-' + $el.attr('id') ).click();
			}
		});
    $('#top')
		  .delegate('#event-nav li[id^=nav]', 'click', function(){
				$(this)
					.siblings('.current')
						.removeClass('current')
						.end()
					.addClass('current');
			})
			// get the anchors now
			.delegate('#event-nav li[id^=nav] a', 'click', function(e){
					e.preventDefault();
					var href = $(this).attr('href').replace(/^.*(#)\/(.*)$/,'$1$2');
					scrollToArticle( href );
				})
			// find the tops of the target articles
			.find('#event-nav li[id^=nav] a')
				.each(function(){
					var
					$this = $(this),
					href	= $this.attr('href').replace(/^.*(#.*)$/,'$1'),
					id		= href.replace('#',''),
					// find the article
					$el		= $(href);
					// find the tops & bottoms
					tops[id]		= $el.offset().top;
					bottoms[id] = tops[id] + $el.outerHeight();
					// adjust the href
					$this.attr('href','#/'+id);
				});

		// Scrolling
		$window
			.scroll(function(){
				if ( s_timer ){
					clearTimeout( s_timer );
					s_timer = FALSE;
				}
				if ( autoScroll === false )
				{
					s_timer = setTimeout( realScroll, 50 );
				}
			});
		function realScroll()
		{
			// manage the timer
			clearTimeout( s_timer );
			s_timer = FALSE;
			var
			article,
			current = FALSE,
			top			= $document.scrollTop();
			for ( article in tops )
			{
				if ( typeof tops[article] == 'number' &&
						 top >= tops[article] )
				{
					current = article;
				}
			}
			if ( current &&
					 current != curr_page )
			{
				$('#nav-'+current).click();
				window.location.hash = '#/' + current;
				curr_page = current;
			}
		}
		function defaultScrollCallback(){
			window.location.hash = '#/' + curr_page;
		};
		function scrollToArticle( selector, callback )
		{
			autoScroll = TRUE;
			new_callback = function(){
				curr_page = selector.replace('#','');
				if ( callback )
				{
					callback();
				}
				else
				{
					defaultScrollCallback();
				}
				setTimeout(function(){
					autoScroll = FALSE;
				},50);
			};

			$document.scrollTo(
				selector,
				500,
				{
					easing:		'swing',
					onAfter:	new_callback
				}
			);
		}
		// initialize
		if ( hash != '' )
		{
			$(hash.replace(/(#)\/?(.*)/,'$1nav-$2')).click();
			scrollToArticle( hash.replace(/(#)\/?(.*)/,'$1$2') );
		}
		else
		{
			realScroll();
		}


		// make sure as focus moves, so does the page
		$('#content').delegate('a,input,select,textarea,button','focus',function(){
			var id = $(this).parents('#details, #lodging, #location, #topics, #contact').attr('id');
			if ( id != curr_page )
			{
				setTimeout(function(){scrollToArticle( '#'+id )},10);
			}
		});


		// image enlargement
		$.getScript('vendors/fancybox/jquery.mousewheel-3.0.2.pack.js',function(){
			$.getScript('vendors/fancybox/jquery.fancybox-1.3.1.js',function(){
				$.get('vendors/fancybox/jquery.fancybox-1.3.1.css',null,function(css){

					css = css.replace(/(url\('?)(.*\.(png|gif|jpg)'?\))/g, '$1vendors/fancybox/$2')
								   .replace(/(src=')(.*\.(png|gif|jpg)')/g, '$1vendors/fancybox/$2');
					$('<style type="text/css">'+css+'</style>').appendTo('head');

					var
					articles	= '#details, #lodging, #location',
					$form			= $('form.card');
					$('.frame img')
						.filter(function(){
							 return ( $(this).parents(articles).length == 1 &&
												! $(this).parent().is('a') );
						 })
						.wrap(function(){
							return '<a rel="gallery" class="enlarge" href="' + $(this).attr('src') +
							       '" title="' + $(this).attr('title') + '"></a>';
						});

					$('a.enlarge').fancybox({
						titleShow: true,
						titlePosition: 'over',
						hideOnContentClick: true,
						centerOnScroll: true,
						margin: 0,
						autoScale: true,
						onStart: function(){
							$('html').removeClass('has-3d');
						},
						onClosed: function( arr, i ){
							if ( supports3d() )
							{
								$('html').addClass('has-3d');
							}
							arr[i].focus();
						},
						titleFormat: function( title ){
							var
							temp = title.split(' - '),
							href;
							if ( temp.length > 1 )
							{
								href =	temp[1];
								temp	= temp[0].split(' by ');
								title = '<a rel="external" href="'+href+'">'+temp[0]+'</a> by '+temp[1];
							}
							return title;
						}
					});

				});
			});
		});

	});