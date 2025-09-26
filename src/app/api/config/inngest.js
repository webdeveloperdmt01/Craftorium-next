import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ayush-jain" });
//inngest function tosave data into database
export const inngestClient = new Inngest({ signingKey: process.env.INNGEST_SIGNING_KEY });
//inngest function to trigger event from frontend
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {event:'clerk/user.created'},
    async ({event})=>{
        const {id,first_name,last_name,email_addresses,image_url} = event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:`${first_name} ${last_name}`,
            imageUrl:image_url,
            
        }
        await  connectDB()
        await User.create(userData)
    }
)
//inneges function to update user data in database
export const syncUserupdation = inngest.createFunction(
    {
        id:'sync-user-update-from-clerk'
    },
    {event:'clerk/user.updated'},
       async ({event})=>{
        const {id,first_name,last_name,email_addresses,image_url} = event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:`${first_name} ${last_name}`,
            imageUrl:image_url,
            
        }
        await connectDB()
        await User.findBIdAndUpdate(id,userData)
    }
)
//inneges function to delete user data in database
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-from-clerk'
    },
    {event:'clerk/user.deleted'},
       async ({event})=>{
       const {id} = event.data;
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)