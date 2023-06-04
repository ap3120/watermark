const image_input = document.querySelector('#image-input');

let text = '';

$('.text-editor-background-color:first').hide();
$('.text-editor-outline:first').hide();

// Uploading images

image_input.addEventListener('change', (e) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let files = e.target.files;

        for (let i=0; i<files.length; i++) {
            if (!files[i].type.match('image')) continue;
            const reader = new FileReader();
            reader.addEventListener('load', e => {
                const uploaded_image = e.target;

                const thumbnail = document.createElement('div');
                thumbnail.classList.add('thumbnail-container');
                thumbnail.innerHTML = `<img class='thumbnail' src='${uploaded_image.result}' title='${uploaded_image.name}'/>`;
                thumbnail.addEventListener('click', () => {
                    $('.image').html(`<img class='main-image' src='${uploaded_image.result}' title='${uploaded_image.name}'/>`);
                })

                const deleteThumbnail = document.createElement('div');
                deleteThumbnail.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
                deleteThumbnail.classList.add('delete-thumbnail');
                deleteThumbnail.addEventListener('click', () => {
                    thumbnail.remove();
                })
                
                thumbnail.appendChild(deleteThumbnail);
                document.querySelector('#gallery').appendChild(thumbnail);
            })
            reader.readAsDataURL(files[i]);
        }
    } else {
        alert("Your browser can't support that operation.");
    }
})

// Adding logo

$('#logo-input').on('change', e => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let files = e.target.files;

        for (let i=0; i<files.length; i++) {
            if (!files[i].type.match('image')) continue;
            const reader = new FileReader();
            reader.addEventListener('load', e => {
                const uploadedLogo = e.target;
                const logo = document.createElement('div');
                logo.classList.add('logo');
                logo.style.backgroundImage = `url(${uploadedLogo.result})`;
                document.querySelector('.image').appendChild(logo);
                // Moving the logo

                // Initialize variables
                let isDragging = false;
                let isResizing = false;
                let startX;
                let startY;
                let startWidth;
                let startHeight;

                // Add event listeners for mousedown and mouseup events
                logo.addEventListener('mousedown', handleMouseDown);
                window.addEventListener('mouseup', handleMouseUp);

                // Handle mousedown event on the element
                function handleMouseDown(e) {
                    const allLogos = document.getElementsByClassName('logo');
                    for (let i=0; i<allLogos.length; i++) {
                        if (allLogos[i] === logo) {
                            logo.classList.add('logo-focus');
                        } else {
                            allLogos[i].classList.remove('logo-focus');
                        }
                    }

                    if (e.target === logo) {
                        e.preventDefault();
                        startX = e.clientX;
                        startY = e.clientY;
                        startWidth = parseInt(getComputedStyle(logo).width, 10);
                        startHeight = parseInt(getComputedStyle(logo).height, 10);

                        if (e.offsetX > startWidth - 10 && e.offsetY > startHeight - 10) {
                            isResizing = true;
                        } else {
                            isDragging = true;
                        }
                    }
                }

                // Handle mouseup event on the window
                function handleMouseUp() {
                  isDragging = false;
                  isResizing = false;
                }

                // Add event listener for mousemove event
                window.addEventListener('mousemove', handleMouseMove);

                // Handle mousemove event
                function handleMouseMove(e) {
                  if (isDragging) {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    logo.style.left = `${logo.offsetLeft + dx}px`;
                    logo.style.top = `${logo.offsetTop + dy}px`;
                    startX = e.clientX;
                    startY = e.clientY;
                  }

                  if (isResizing) {
                    const dw = e.clientX - startX;
                    const dh = e.clientY - startY;
                    logo.style.width = `${startWidth + dw}px`;
                    logo.style.height = `${startHeight + dh}px`;
                  }
                }

            })
            reader.readAsDataURL(files[i]);
        }
    } else {
        alert("Your browser can't support that operation.");
    }
})

// Adding text

$('#add-text').on('click', () => {
    const $text = $('<p>', {'class': 'text text-focus'});
    $text.html('Type your text...');
    $text.attr('hasBackground', 'false');
    $('.image-container').append($text);
    $text.on('click', () => {
        const allText = document.getElementsByClassName('text');
        for (let i=0; i<allText.length; i++) {
            if ($(allText[i]).get(0) === $text.get(0)) {
                $text.addClass('text-focus');
            } else {
                $(allText[i]).removeClass('text-focus');
            }
        }
        if ($text.attr('hasBackground') === 'true') {
            $('.background-checkbox').prop('checked', true).trigger('change');
        } else {
            $('.background-checkbox').prop('checked', false).trigger('change');
        }
        let currentText = $text.html();
        currentText = currentText.replace(/\s?(<br\s?\/?>)\s?/g, "\r\n");
        $('.text-editor-input').val(currentText);
    });
    $text.on('mousedown', moveText);
})

$('.text-editor-input:first').on('input', () => {
    let v = $('.text-editor-input:first').val();
    v = v.replace(/\r?\n/g, '<br />');
    $('.text-focus').html(v);
})

// Bold text

$('.fa-bold:first').click(() => {
    $('.text-focus').toggleClass('bold');
})

// Italic text

$('.fa-italic:first').click(() => {
    $('.text-focus').toggleClass('italic');
})

// Underline text

$('.fa-underline:first').click(() => {
    $('.text-focus').toggleClass('underline');
})

// Change text color

$('.text-editor-color:first').on('input', () => {
    let color = $('.text-editor-color:first').val();
    $('.text-focus').css('color', color);
})

// Change text size

$('.text-editor-size:first').on('input', () => {
    let size = $('.text-editor-size:first').val();
    $('.text-focus').css('font-size', `${size}px`);
    $('#font-size').html(size);
})

// Change text opacity

$('.text-editor-opacity:first').on('input', () => {
    let opacity = $('.text-editor-opacity:first').val();
    $('.text-focus').css('opacity', opacity);
})

// Rotate text

$('.text-editor-rotate:first').on('input', () => {
    let angle = $('.text-editor-rotate:first').val();
    $('.text-focus').css('transform', `rotate(${angle}deg)`);
})

// Moving the text

//let $text = $('.text:first');
//$text.on('mousedown', function(e) {
const moveText = e => {
    e.stopPropagation();
  
    let text = e.target;

    let initialX = e.clientX;
    let initialY = e.clientY;
  
    let originalTop = parseInt($(text).css('top'));
    let originalLeft = parseInt($(text).css('left'));
  
    $(document).on('mousemove', function(e) {
        e.stopPropagation();
        let x = originalLeft + e.clientX - initialX + 'px';
        let y = originalTop + e.clientY - initialY + 'px';
        $(text).css({ 'top': y, 'left': x });
    });
  
    $(document).on('mouseup', function(e) {
        e.stopPropagation();
        $(document).off('mousemove');
        $(document).off('mouseup');
    });
}
//});

// Text Background

$('.background-checkbox:first').change(function() {
    if (!$(this).is(':checked')) {
        $('.text-editor-background-color:first').hide();
        $('.text-focus').css('background-color', 'transparent');
        $('.text-focus').attr('hasBackground', 'false');
    } else {
        $('.text-editor-background-color:first').show();
    }
});

$('.text-editor-background-color:first').on('input', () => {
    const backgroundColor = $('.text-editor-background-color:first').val();
    $('.text-focus').css('background-color', backgroundColor);
    $('.text-focus').attr('hasBackground', 'true');
})

// Text outline

$('.outline-checkbox:first').change(function() {
    if (!$(this).is(':checked')) {
        $('.text-editor-outline:first').hide();
        $('.text-focus').addClass('no-outline');
        $('.text-focus').removeClass('outline');
    } else {
        $('.text-editor-outline:first').show();
        $('.text-focus').removeClass('no-outline');
        $('.text-focus').addClass('outline');
    }
});

$('.text-editor-outline:first').on('input', () => {
    const outlineColor = $('.text-editor-outline:first').val();
    $('.text-focus').css('-webkit-text-stroke-color', outlineColor);
})

// Delete Text

$('#delete-text').on('click', () => {
    $('.text-focus').remove();
})

// Logo opacity

$('.logo-editor-opacity:first').on('input', () => {
    const opacity = $('.logo-editor-opacity:first').val();
    $('.logo-focus').css('opacity', opacity);
})

// Rotate logo

$('.logo-editor-rotate:first').on('input', () => {
    const angle = $('.logo-editor-rotate:first').val();
    $('.logo-focus').css('transform', `rotate(${angle}deg)`);
})
// Download new image

$('#download').click(() => {
    domtoimage.toBlob(document.getElementById('image-to-download'))
    .then(function (blob) {
        window.saveAs(blob, 'custom_image.png');
    })
    .catch(() => {
      console.log('Error downloading image.');
    });
});

// Deleting Logo

$('#delete-logo').on('click', () => {
    $('.logo-focus').remove();
})
