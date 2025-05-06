/**
 * Este archivo fue creado para manejar las notificaciones
 */
const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

function success(message) {
  notyf.success(message);
}
