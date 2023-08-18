import axios from 'axios'

export const sendLineNotify = async (message: string, lineToken: string): Promise<void> => {
  try {
    // NOTE: must have line token
    if (!lineToken) return

    const newMessage = encodeURIComponent(message)
    await axios.post('https://notify-api.line.me/api/notify', `message=${newMessage}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${lineToken}`,
      },
    })
  } catch (error) {
    throw error
  }
}
