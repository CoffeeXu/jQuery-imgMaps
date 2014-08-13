/*
* jQuery-imgMaps jQuery plugin v1.0
*
* Allows image maps to be used in a responsive design by recalculating the a  to match the actual image size on load and window.resize
*
* https://github.com/CoffeeXu/jQuery-imgMaps
* Demo:
*/
;(function($) {
	$.fn.imgMaps = function() {
		var $obj = this,
			$img = $obj.find('img');

		$obj.find('a').each(function() {
			var $this   = $(this),
				left0   = parseInt( $this.css('left') ),
				top0    = parseInt( $this.css('top') ),
				width0  = parseInt( $this.css('width') ),
				height0 = parseInt( $this.css('height') );
			$this.attr({
				'data-l': left0,
				'data-t': top0,
				'data-w': width0,
				'data-h': height0
			})
		});

		var imgMap = function() {

			var w = $img.width(),
				h = $img.height();

			$img.each(function() {

				var that = this,
					$that = $(that);

				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
				$('<img />').load(function() {
					var oriw = this.width,
						orih = this.height;

					if (!oriw || !orih) {
						var temp = new Image();
						temp.src = $that.attr('src');
						if (!oriw)
							oriw = temp.width;
						if (!orih)
							orih = temp.height;
					}

					$obj.find('a').each(function() {
						var $this = $(this);

						var newl = $this.attr('data-l')/oriw*w,
							neww = $this.attr('data-w')/oriw*w,
							newt = $this.attr('data-t')/orih*h,
							newh = $this.attr('data-h')/orih*h;

						$this.css({
							top: newt,
							left: newl,
							height: newh,
							width: neww
						})
					});


				}).attr('src', $that.attr('src'));

			});
		};
		$(window).resize(imgMap).trigger('resize');

		return this;
	};
})(jQuery);
