function searchRepo(handle) {
    url = `https://api.github.com/users/${handle}/repos`
    const objects = {
        headers: {'Accept': 'application/vnd.github.v3+json'}
    }
    fetch(url, objects)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            $('.hidden').css('display', 'none');
            throw new Error(response.statusText);
        })
        .then(responseJSON => displayRepo(responseJSON))
        .catch(error => 
            {
                $('.error-message').text(`Something went wrong: ${error.message}`);
        });
}

function displayRepo(responseJSON) {
    $('.error-message').empty();
    $('#results-list').empty();
    $('.hidden').css('display', 'block');
    responseJSON.forEach(repo => {
        console.log(repo);
        $('#results-list').append(`<li>Name: ${repo.name}  <a href="${repo.svn_url}" >Link</a>`);
    })
}

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const handle = $('#js-search-term').val();
        searchRepo(handle);
    })
}

$(watchForm)