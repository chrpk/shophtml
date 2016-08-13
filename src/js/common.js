$('#btn-menu').click(function(event) {
	/* Act on the event */
	$('#nav-menu').toggle('slow');
});

$('#search-form').click(function(event) {
	/* Act on the event */
});

$('#filter-form-btn').click(function(event) {
	$('#filter-form').toggle('fast');
	$('#dark-bg').toggle('fast');
});

$('#dark-bg').click(function(event) {
	$('#filter-form').toggle('fast');
	$('#dark-bg').toggle('fast');
});

$('#btn-search').click(function(event) {
	$('#search-form').toggle('slow');
});