import { AtSign, Info, UsersRound } from 'lucide-react'
import MemberTab from './MemberTab'
import Thread from './Thread'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const CommunityTab = ({ parsedContent, id }) => {
    return (
        <>
            <Tabs defaultValue="detail">
                <TabsList className="tab" >
                    <TabsTrigger value="detail" className="tab rounded-2xl" >
                        <Info className='flex sm:hidden text-light-400 font-bold' />
                        <h3 className="text-30-bold-light hidden sm:flex" > Detail </h3>
                    </TabsTrigger>
                    <TabsTrigger value="thread" className="tab rounded-2xl" >
                        <AtSign className='flex sm:hidden text-light-400 font-bold' />
                        <h3 className="text-30-bold-light hidden sm:flex" > Threads </h3>
                    </TabsTrigger>
                    <TabsTrigger value="members" className="tab rounded-2xl" >
                        <UsersRound className='flex sm:hidden text-light-400 font-bold' />
                        <h3 className="text-30-bold-light hidden sm:flex" > Members </h3>
                    </TabsTrigger>
                </TabsList>


                <TabsContent value="detail">
                    {parsedContent ? (
                        <article className="prose max-w-full font-work-sans break-all mt-8" dangerouslySetInnerHTML={{ __html: parsedContent }} />
                    ) : (<p className="no-result" > No details provided </p>)}
                </TabsContent>

                <TabsContent value="thread">
                    <Thread id={id} />
                </TabsContent>

                <TabsContent value="members">
                    <MemberTab id={id} />
                </TabsContent>
            </Tabs>

        </>
    )
}

export default CommunityTab
