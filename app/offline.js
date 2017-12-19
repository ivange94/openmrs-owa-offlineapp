self.addEventListener('sync', function(event) {
    if (event.tag == 'myOneOffSync') {
        console.log("Syncing");
    }
});