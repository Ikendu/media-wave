const ConversationAnalysis = ({ analytics }) => {
  return (
    <div>
      <div className="flex gap-2 justify-between mt-8">
        <div className="flex gap-8 ">
          <Analysis
            topic={`All conversations`}
            count={analytics?.all_conversations}
          />
          <Analysis
            topic={`Handled conversations`}
            count={analytics?.handled_conversations}
          />
          <Analysis
            topic={`Missed conversations`}
            count={analytics?.missed_conversations}
          />
        </div>
        <div className="bg-white p-5 px-11 rounded-lg">
          <p>Conversations Taken over by bot</p>
          <h3 className=" text-center font-bold text-3xl">0</h3>
        </div>
      </div>
    </div>
  )
}

const Analysis = ({ topic, count }) => {
  return (
    <span className="bg-white p-5 rounded-lg">
      <p className="text-center">{topic}</p>
      <h3 className=" text-center font-bold text-3xl">{count}</h3>
    </span>
  )
}

export default ConversationAnalysis
