const image_input = document.querySelector('#image-input');

let text = '';

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
                    $('.image').html(`<img src='${uploaded_image.result}' title='${uploaded_image.name}'/>`);
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

// Adding text

$('.text-editor-input:first').on('input', () => {
    let v = $('.text-editor-input:first').val();
    $('.text:first').html(v);
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

