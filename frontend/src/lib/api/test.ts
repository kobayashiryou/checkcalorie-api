import client from "lib/api/client"

export const execTest = () => {
  return client.get("/tests")
}

//clientには"http://localhost:3001/api/v1"が入っているので、最後に/testを付け足して、APIを叩いている