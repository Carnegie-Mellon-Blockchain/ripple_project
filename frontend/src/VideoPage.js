import { useParams } from "react-router-dom";
import Header from './Header';

function VideoPage() {
  const { videoId } = useParams(); // Extract the videoId from URL

  return (
    <div style={styles.appContainer}>
      <Header />
      <div style={styles.content}>
		<iframe width="560" height="315" src="https://www.youtube.com/embed/jfKfPfyJRdk?si=eVFTODuklYF5JcG2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	  </div>
	</div>
  );
}

export default VideoPage;


const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

