const backend = "https://safeshort.risidev.workers.dev";

const postUrl = async (url) => {
  console.log(url);
  try {
    const res = await fetch(`${backend}/shorten`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    console.log(res);
    if (!res.ok) {
      return;
    }

    const data = await res.json(); // parse the response as JSON
    console.log(data)
    return data.shortenedUrl; // return the shortened URL
  } catch (error) {
    console.error(error); // log any errors
  }
};


export default postUrl;

