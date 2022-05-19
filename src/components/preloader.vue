<template>

</template>



 <script>
window.addEventListener("load", () => {
  let maskElement = document.querySelector(".mask");
  if (!maskElement) {
    return;
  }
 maskElement.classList.add("hide");
  setTimeout(() => {
      maskElement.remove();
  }, 600);
});
</script>