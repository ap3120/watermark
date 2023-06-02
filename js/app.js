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
                $('.image').append(`<div id='draggableResizableElement' class='logo' style='background-image: url(${uploadedLogo.result})'></div>`);

                // Moving the logo

                // Get the draggable and resizable element
                const draggableResizableElement = document.getElementById('draggableResizableElement');

                // Initialize variables
                let isDragging = false;
                let isResizing = false;
                let startX;
                let startY;
                let startWidth;
                let startHeight;

                // Add event listeners for mousedown and mouseup events
                draggableResizableElement.addEventListener('mousedown', handleMouseDown);
                window.addEventListener('mouseup', handleMouseUp);

                // Handle mousedown event on the element
                function handleMouseDown(e) {
                  if (e.target === draggableResizableElement) {
                    e.preventDefault();
                    startX = e.clientX;
                    startY = e.clientY;
                    startWidth = parseInt(getComputedStyle(draggableResizableElement).width, 10);
                    startHeight = parseInt(getComputedStyle(draggableResizableElement).height, 10);

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
                    draggableResizableElement.style.left = `${draggableResizableElement.offsetLeft + dx}px`;
                    draggableResizableElement.style.top = `${draggableResizableElement.offsetTop + dy}px`;
                    startX = e.clientX;
                    startY = e.clientY;
                  }

                  if (isResizing) {
                    const dw = e.clientX - startX;
                    const dh = e.clientY - startY;
                    draggableResizableElement.style.width = `${startWidth + dw}px`;
                    draggableResizableElement.style.height = `${startHeight + dh}px`;
                  }
                }

                //let $logo = $('.logo');
                /*$logo.on('mousedown', function(e) {
                    e.stopPropagation();
                  
                    let initialX = e.clientX;
                    let initialY = e.clientY;
                  
                    let originalTop = parseInt($logo.css('top'));
                    let originalLeft = parseInt($logo.css('left'));
                  
                    $(document).on('mousemove', function(e) {
                        e.stopPropagation();
                        let x = originalLeft + e.clientX - initialX + 'px';
                        let y = originalTop + e.clientY - initialY + 'px';
                        $logo.css({ 'top': y, 'left': x });
                    });
                  
                    $(document).on('mouseup', function(e) {
                        e.stopPropagation();
                        $(document).off('mousemove');
                        $(document).off('mouseup');
                    });
                });*/

            })
            reader.readAsDataURL(files[i]);
        }
    } else {
        alert("Your browser can't support that operation.");
    }
})

// Adding text

$('.text-editor-input:first').on('input', () => {
    let v = $('.text-editor-input:first').val();
    v = v.replace(/\r?\n/g, '<br />');
    $('.text:first').html(v);
})

// Bold text

$('.fa-bold:first').click(() => {
    $('.text:first').toggleClass('bold');
})

// Italic text

$('.fa-italic:first').click(() => {
    $('.text:first').toggleClass('italic');
})

// Underline text

$('.fa-underline:first').click(() => {
    $('.text:first').toggleClass('underline');
})

// Change text color

$('.text-editor-color:first').on('input', () => {
    let color = $('.text-editor-color:first').val();
    $('.text:first').css('color', color);
})

// Change text size

$('.text-editor-size:first').on('input', () => {
    let size = $('.text-editor-size:first').val();
    $('.text:first').css('font-size', `${size}px`);
    $('#font-size').html(size);
})

// Change text opacity

$('.text-editor-opacity:first').on('input', () => {
    let opacity = $('.text-editor-opacity:first').val();
    $('.text:first').css('opacity', opacity);
})

// Rotate text

$('.text-editor-rotate:first').on('input', () => {
    let angle = $('.text-editor-rotate:first').val();
    $('.text:first').css('transform', `rotate(${angle}deg)`);
})

// Moving the text

let $text = $('.text:first');
$text.on('mousedown', function(e) {
    e.stopPropagation();
  
    let initialX = e.clientX;
    let initialY = e.clientY;
  
    let originalTop = parseInt($text.css('top'));
    let originalLeft = parseInt($text.css('left'));
  
    $(document).on('mousemove', function(e) {
        e.stopPropagation();
        let x = originalLeft + e.clientX - initialX + 'px';
        let y = originalTop + e.clientY - initialY + 'px';
        $text.css({ 'top': y, 'left': x });
    });
  
    $(document).on('mouseup', function(e) {
        e.stopPropagation();
        $(document).off('mousemove');
        $(document).off('mouseup');
    });
});

// Text Background

$('.background-checkbox:first').change(function() {
    if (!$(this).is(':checked')) {
        $('.text-editor-background-color:first').hide();
    } else {
        $('.text-editor-background-color:first').show();
    }
});

$('.text-editor-background-color:first').on('input', () => {
    const backgroundColor = $('.text-editor-background-color:first').val();
    $('.text:first').css('background-color', backgroundColor);
})

// Text outline

$('.outline-checkbox:first').change(function() {
    if (!$(this).is(':checked')) {
        $('.text-editor-outline:first').hide();
        $('.text:first').addClass('no-outline');
        $('.text:first').removeClass('outline');
    } else {
        $('.text-editor-outline:first').show();
        $('.text:first').removeClass('no-outline');
        $('.text:first').addClass('outline');
    }
});

$('.text-editor-outline:first').on('input', () => {
    const outlineColor = $('.text-editor-outline:first').val();
    $('.text:first').css('-webkit-text-stroke-color', outlineColor);
})

// Logo opacity

$('.logo-editor-opacity:first').on('input', () => {
    const opacity = $('.logo-editor-opacity:first').val();
    $('.logo').css('opacity', opacity);
})

// Rotate logo

$('.logo-editor-rotate:first').on('input', () => {
    const angle = $('.logo-editor-rotate:first').val();
    $('.logo').css('transform', `rotate(${angle}deg)`);
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

