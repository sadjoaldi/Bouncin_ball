window.onload = () => {
  const ball_container = document.getElementById(
    "ball_container"
  ) as HTMLDivElement;

  const ball_bouncing = document.getElementById(
    "ball_bouncing"
  ) as HTMLDivElement;

  const gravity: number = 0.4;
  const bounceFactor: number = 0.7;
  let velocity: number = 0;
  let position: number = 0;
  let animationId: number | null = null;

  const containerHeight: number = ball_container.clientHeight;
  const ballHeight: number = ball_bouncing.clientHeight;

  const animationLoop = () => {
    velocity += gravity;
    position += velocity;

    // Condition lors de la collision avec le sol: le bas du conteneur
    if (position + ballHeight >= containerHeight) {
      position = containerHeight - ballHeight;
      velocity *= -bounceFactor;

      // Effet d'écrasement: ajout d'une échelle Y pour simuler l'écrasement et le rebond de la balle
      ball_bouncing.style.transform = `translate(-50%, ${position}px) scaleY(0.8)`;
      setTimeout(() => {
        ball_bouncing.style.transform = `translate(-50%, ${position}px) scaleY(1)`;
      }, 100);
    }

    // Condition qui permet de reiniitaliser le mouvement de la ball à partir du haut lorsqu'elle sera à à l'arrêt
    if (
      Math.abs(velocity) < 0.5 &&
      position + ballHeight >= containerHeight - 1
    ) {
      position = 0;
      velocity = 0;
      ball_bouncing.style.transform = `translate(-50%, ${position}px)`;
    }

    // Mise à jour de la position
    ball_bouncing.style.transform = `translate(-50%, ${position}px)`;
    animationId = requestAnimationFrame(animationLoop);
  };

  // Appelle de la fonction d'animation au démarrage de la page
  animationLoop();

  // Interaction avec le ballon pour redonner de l'énergie
  ball_bouncing.addEventListener("click", () => {
    velocity = -bounceFactor * 10; // Appliquer une impulsion vers le haut
  });
};
