var fileuploader_container = $('.file_upload_container');
var reader = new FileReader();
var supported_ext = ['jpeg', 'jpg', 'png', 'gif', 'doc', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
if (validateIfUserInputExtIsSupported()) {
	fileuploader_container
		.find("input:file")
		.before(function() {
			return "<img style='width:300px; height:300px;' alt='Upload image' />"
		});
	fileuploader_container
		.find("input:file")
		.after(function() {
			return "<span></span>"
		});
	fileuploader_container
		.find("input:file")
		.on('change', function() {
			var event = arguments[0];
			console.log(event.target.files[0].type);
			var validextensions = $(this).data('validextensions');
			if (validextensions) {
				var validity = validateFile(event.target.files[0], validExtensionsArray(validextensions));
				if (validity) {
					removeErrorMessage($(this));
					previewImage($(this), event);
				} else {
					showErrorMessage($(this));
				}
				console.log(validity);
			} else {
				previewImage($(this), event);
			}
			console.log(event);
		});
}

function validateFile(file, extentions) {
	validity = false;
	if (extentions.indexOf(file.type.split('/')[1]) > -1) {
		validity = true;
	}
	return validity;
}

function validExtensionsArray(validextensions) {
	var extentions = [];
	var userinput_ext = validextensions.split(',');
	$.each(userinput_ext, function(index, val) {
		if (val === "doc") {
			val = "msword";
		}
		if (val === "xls") {
			val = "vnd.ms-excel";
		}
		if (val === "docx") {
			val = "vnd.openxmlformats-officedocument.wordprocessingml.document";
		}
		if (val === "xlsx") {
			val == "vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		}
		extentions.push(val);
	});
	return extentions;
}

function previewImage(file_element, event) {
	reader.onload = function(eventReader) {
		image = eventReader.target.result;
		file_element.prev().attr('src', image);
	};
	reader.readAsDataURL(event.target.files[0]);
}

function showErrorMessage(file_element) {
	var span_element = file_element.next();
	span_element.css('color', 'red');
	span_element.html("Invalid file extentions. Valid extensions : " + file_element.data('validextensions').replace(",", ' '));
	file_element.prev().removeAttr('src');
}

function removeErrorMessage(file_element) {
	var span_element = file_element.next();
	span_element.html("");
}

function validateIfUserInputExtIsSupported() {
	$("input[data-validextensions]").each(function() {
		var isSupported = false;
		var hit_count = 0;
		var userinput_ext = $(this).data("validextensions").split(",");
		console.log(userinput_ext);
		$.each(userinput_ext, function(index, extension) {
			if (!(supported_ext.indexOf(extension) > -1)) {
				hit_count++;
			}
		});
		console.log(hit_count);
		if (hit_count > 0) {
			throw "data-validextension contains unsupported input. Please refer to the documentaion : www.github/kmarxmacalalag/code_coletions/javascript/img_upload.git";
		} else
			return isSupported;
	});
}