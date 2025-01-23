from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound, NoTranscriptAvailable, \
    NotTranslatable, CouldNotRetrieveTranscript, TranslationLanguageNotAvailable
from youtubesearchpython import VideosSearch


def getTranscript(video_id):
    final_text = ""
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id.lstrip("https://www.youtube.com/watch?v="))
        print(YouTubeTranscriptApi.get_transcript("en"))
        transcript = transcript_list.find_transcript(['en'])
        translated_transcript = transcript.translate('en')
        final_output = translated_transcript.fetch()
        final_text = ''.join([entry['text'].strip("\n") for entry in final_output])


        return True, final_text  # Indicate success

    except (TranscriptsDisabled, NoTranscriptFound, NoTranscriptAvailable, NotTranslatable, CouldNotRetrieveTranscript,
            TranslationLanguageNotAvailable) as e:
        print(f"Could not retrieve transcript for video {video_id}: {str(e)}")
        return False, final_text  # Indicate failure


def searchByKeyword(s, limit=10):
    videos = []
    videoSearch = VideosSearch(s, limit=limit)
    results = videoSearch.result()["result"]

    for result in results:
        video_link = result["link"]
        video_id = video_link.split("v=")[-1]  # Extract video ID after "v="
        videos.append({
            "title": result["title"],
            "id": video_id,  # Extracted video ID
            "link": video_link
        })

    return videos


def getValidTranscript(keyword, limit=5):
    links = searchByKeyword(keyword, limit=limit * 2)
    print(links)
    count = 1
    successful_count = 1

    for link in links:
        transcript_available, transcript = getTranscript(link)
        print(f"Looking into Video #{count}, the status is {transcript_available}")
        if transcript_available:
            print(f"This is video #{successful_count}:\n{transcript}\n\n")
            successful_count += 1
        if successful_count > limit:
            break
        count += 1


# Example usage
"""
getValidTranscript("Apple Potato Bacon Cream Cheese recipe", limit=1)
status, transcript = getTranscript("https://www.youtube.com/watch?v=ZSYZAIs85XY")
print(transcript)
"""

