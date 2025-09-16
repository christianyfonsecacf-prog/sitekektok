function shareVideo() {
  // URL do vídeo do YouTube
  var videoUrl = "https://www.youtube.com/watch?v=o8awJ_un1-A";  // Substitua com a URL real do vídeo
  var siteUrl = "https://www.seusite.com";  // Substitua com o link do seu site

  // Mensagem personalizada que será compartilhada
  var message = `Assista a este vídeo incrível e acesse nosso site para mais informações: ${siteUrl}`;

  // Verifica se a API Web Share está disponível (apenas para dispositivos móveis e navegadores compatíveis)
  if (navigator.share) {
      navigator.share({
          title: 'Assista a este vídeo!',
          text: message,
          url: videoUrl
      }).then(() => {
          console.log('Vídeo compartilhado com sucesso!');
      }).catch((error) => {
          console.log('Erro ao compartilhar:', error);
      });
  } else {
      // Caso o navegador não suporte a API Web Share, cria um link de compartilhamento manual
      // Compartilhar no Facebook
      var shareUrlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}&quote=${encodeURIComponent(message)}`;
      window.open(shareUrlFacebook, '_blank');

      // Compartilhar no Twitter
      var shareUrlTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(videoUrl)}`;
      window.open(shareUrlTwitter, '_blank');

      // Compartilhar no WhatsApp
      var shareUrlWhatsApp = `https://wa.me/?text=${encodeURIComponent(message)}%20${encodeURIComponent(videoUrl)}`;
      window.open(shareUrlWhatsApp, '_blank');

      // Compartilhar no LinkedIn
      var shareUrlLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoUrl)}`;
      window.open(shareUrlLinkedIn, '_blank');
  }
}
