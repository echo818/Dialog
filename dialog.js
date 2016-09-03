;(function($) {
	var Dialog = function(config){
		this.config = {
			width: 'auto', // 宽度
			height: 'auto', // 高度
			style: null, // 风格
			message: null, // 提示信息
			type: 'load', // 类型
			buttons: null, // 按钮
			delay: null, // 延迟关闭
			maskOpacity: null, // 透明度
			isClose: false,
		};

		if(config && $.isPlainObject(config)){
			$.extend(this.config,config);
		}else{
			this.config = false;
		}

		this.body = $('body');
		this.mask = $('<div class="mask">');
		this.dialog = $('<div class="dialog">');
		this.pic = $('<div class="picture">');
		this.text = $('<div class="text">');
		this.button = $('<div class="button">');

		this.init();
	};

	Dialog.zIndex = 10000;
	Dialog.prototype = {
		init: function(){
			var _this = this,
				config = this.config,
				body = this.body,
				mask = this.mask,
				dialog = this.dialog,
				pic = this.pic,
				text = this.text,
				button = this.button;
			
			mask.css('z-index',Dialog.zIndex++);

			var types = ['load','right','warn'],
				styles = ['dark'],
				btnTypes = ['sure','cancel'];
			if(!config){
				pic.addClass('load');
				dialog.append(pic);
				mask.append(dialog);
				body.append(mask);
			}else{
				if (!!config.type && $.inArray(config.type,types) > -1) {
					pic.addClass(config.type);
				}else{
					pic.addClass('load');
				}

				if (!!config.style && $.inArray(config.style,styles) > -1) {
					dialog.addClass(config.style).append(pic);
				}else{
					dialog.append(pic);
				}

				if (!!config.message) {
					dialog.append(text.html(config.message));
				}

				if ($.isNumeric(config.width)) {
					dialog.css('width', config.width + 'px');
				}

				if ($.isNumeric(config.height)) {
					dialog.css('height', config.height + 'px');
				}

				if(!!config.buttons && $.isArray(config.buttons)){
					for(var i=0, len=config.buttons.length; i<len; i++){
						var btn = config.buttons[i];
						var botton = $('<button>');
						if(!!btn.type && $.inArray(btn.type,btnTypes) > -1){
							botton.addClass(btn.type);
						}

						if(!!btn.text && typeof btn.text == 'string'){
							botton.html(btn.text);
						}else{
							botton.html('按钮');
						}

						if(!!btn.callback && $.isFunction(btn.callback)){
							botton.on('tap',function(){
								btn.callback();
								if(!!btn.isClose && typeof btn.isClose == 'boolean'){
									_this.close();
								}
							})
						}

						button.append(botton);
					}
					dialog.append(button);
				}

				if (!!config.maskOpacity && $.isNumeric(config.maskOpacity)) {
					mask.css('background', 'rgba(0,0,0,' + config.maskOpacity + ')').append(dialog);
				}else{
					mask.append(dialog);
				}

				body.append(mask);

				if (!!config.delay && $.isNumeric(config.delay)) {
					setTimeout(function(){
						_this.close();
					}, config.delay);
				}

				if(config.isClose && typeof config.isClose == 'boolean'){
					mask.on('click',function(){
						_this.close();
					})
				}
			}
		},
		close: function(){
			this.mask.remove();
		}
	}

	window.Dialog = Dialog;

	$.dialog = function(config){
		new Dialog(config);
	}
})(Zepto)