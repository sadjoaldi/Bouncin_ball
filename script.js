window.onload = function () {
    var ball_container = document.getElementById("ball_container");
    var ball_bouncing = document.getElementById("ball_bouncing");
    var gravity = 0.4;
    var bounceFactor = 0.7;
    var velocity = 0;
    var position = 0;
    var animationId = null;
    var containerHeight = ball_container.clientHeight;
    var ballHeight = ball_bouncing.clientHeight;
    var animationLoop = function () {
        velocity += gravity;
        position += velocity;
        // Condition lors de la collision avec le sol: le bas du conteneur
        if (position + ballHeight >= containerHeight) {
            position = containerHeight - ballHeight;
            velocity *= -bounceFactor;
            // Effet d'écrasement: ajout d'une échelle Y pour simuler l'écrasement et le rebond de la balle
            ball_bouncing.style.transform = "translate(-50%, ".concat(position, "px) scaleY(0.8)");
            setTimeout(function () {
                ball_bouncing.style.transform = "translate(-50%, ".concat(position, "px) scaleY(1)");
            }, 100);
        }
        // Condition qui permet de reiniitaliser le mouvement de la ball à partir du haut lorsqu'elle sera à à l'arrêt
        if (Math.abs(velocity) < 0.5 &&
            position + ballHeight >= containerHeight - 1) {
            position = 0;
            velocity = 0;
            ball_bouncing.style.transform = "translate(-50%, ".concat(position, "px)");
        }
        // Mise à jour de la position
        ball_bouncing.style.transform = "translate(-50%, ".concat(position, "px)");
        animationId = requestAnimationFrame(animationLoop);
    };
    // Appelle de la fonction d'animation au démarrage de la page
    animationLoop();
    // Interaction avec le ballon pour redonner de l'énergie
    ball_bouncing.addEventListener("click", function () {
        velocity = -bounceFactor * 10; // Appliquer une impulsion vers le haut
    });
};
