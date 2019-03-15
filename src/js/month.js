jQuery(function($) {

    var file_frame;

    $(document).on('click', '#months-metabox a.gallery-add', function(e) {

        e.preventDefault();

        if (file_frame) file_frame.close();

        file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Хід виробництва',
            button: {
                text: 'Upload',
            },
            multiple: true
        });

        file_frame.on('select', function() {
            var listIndex = $('#months-gallery-metabox-list li').index($('#months-gallery-metabox-list li:last')),
                selection = file_frame.state().get('selection');

            selection.map(function(attachment, i) {
                attachment = attachment.toJSON(),
                    index  = listIndex + (i + 1);

                $('#months-gallery-metabox-list').append('<li>' +
                    '<div class="img-block">' +
                    '<input type="hidden" name="vdw_month_gallery_id[' + index + ']" value="' + attachment.id + '">' +
                    '<img class="image-preview" src="' + attachment.sizes.thumbnail.url + '">' +
                    '<a class="change-image button button-small" href="#" data-uploader-title="Change image" data-uploader-button-text="Change image">Замінити зображення</a><br>' +
                    '</div>' +
                    '<div class="fields-box">\n' +
                    '<label>Місяць</label>\n' +
                    '<input class="title" type="text" name="extra[month-page-title-' + index + ']" value="" />\n' +
                    '</div>' +
                    '<div class="remove"><a class="remove-image" href="#">Видалити</a></div>' +
                    '</li>');
            });
        });

        makeSortable();

        file_frame.open();

    });

    $(document).on('click', '#months-metabox a.change-image', function(e) {

        e.preventDefault();

        var that = $(this);

        if (file_frame) file_frame.close();

        file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Хід виробництва',
            button: {
                text: 'Upload',
            },
            multiple: false
        });

        file_frame.on( 'select', function() {
            attachment = file_frame.state().get('selection').first().toJSON();

            that.parent().find('input:hidden').attr('value', attachment.id);
            that.parent().find('img.image-preview').attr('src', attachment.sizes.thumbnail.url);
        });

        file_frame.open();

    });

    function resetIndex() {
        $('#months-gallery-metabox-list li').each(function(i) {
            $(this).find('input:hidden').attr('name', 'vdw_month_gallery_id[' + i + ']');
            $(this).find('input.title').attr('name', 'extra[month-page-title-' + i + ']');
        });
    }

    function makeSortable() {
        $('#months-gallery-metabox-list').sortable({
            opacity: 0.6,
            stop: function() {
                resetIndex();
            }
        });
    }

    $(document).on('click', '#months-metabox a.remove-image', function(e) {
        e.preventDefault();

        $(this).parents('li').animate({ opacity: 0 }, 200, function() {
            $(this).remove();
            resetIndex();
        });
    });

    makeSortable();

});