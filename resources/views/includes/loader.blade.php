<style type="text/css">
@keyframes loader-animation {
  0% {
    width: 0%;
  }
  50% {
    width: 100%;
    left: 0%;
    background-color: var(--red);
  }
  51% {
    left: 100%;
    width: 0%;
    background-color: var(--red);
  }

  100% {
    left: 0%;
    width: 100%
  }
}
.loader {
  height: 2px;
  width: 100%;
  position: fixed;
  z-index: 1000;
}
.loader .bar {
  position: absolute;
  z-index: 100%;
  height: 4px;
  background-color: var(--red);
  animation-name: loader-animation;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
</style>
