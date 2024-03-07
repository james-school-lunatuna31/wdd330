export function CreateAlerts(Jsonfile) {
    const alertlist = document.getElementById('alert-list');
    alertlist.innerHTML = '';
    fetch("../json/alert.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(post => {
                alertlist.insertAdjacentHTML('beforeend',`<p style="background:${post.background}; color:${post.color};">${post.message}</p>`);
            })
        })
  }