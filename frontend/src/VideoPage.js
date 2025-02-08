import { useParams } from "react-router-dom";
import Header from './Header';
import videos from "./videos.json";
import Quiz from "./Quiz.js";

function VideoPage() {
  const { videoId } = useParams(); // Extract the videoId from URL

  // Find the specific video from JSON
  const video = videos.find((v) => v.id === videoId);

  // If video not found, show an error message
  if (!video) {
    return <h2 style={{ textAlign: "center", color: "red" }}>Video not found</h2>;
  }

  return (
    <div style={styles.appContainer}>
      <Header />
      <div style={styles.content}>
		<h2>{video.title}</h2>
		<p>{video.description}</p>
		<iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

		<Quiz quizzes={video.quiz} videoId={video.id} />

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

