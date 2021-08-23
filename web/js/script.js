$(document).ready(function() {
    $(".A1").click(function() {
        var $this = $(this);
        $(".P1").toggle("slow")

        $this.toggleClass("expanded");

        if ($this.hasClass("expanded")) {
            $this.html("-");
        } else {
            $this.html("+");
        }
    });
});