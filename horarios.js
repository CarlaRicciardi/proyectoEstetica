/*Una recomendación de internet es solo crear documentos al momento de la reserva (no tenerlos creados en modo "disponible").
Para eso, al momento de la creación de un nuevo documento, debería comparar si el horario de

My suggestion = create a new DB document only when the barber actually books something. Big advantage : he can choose both starting and ending hour by the minute. Now the question is, how to prevent overbooking 

I would store startTime and endTime as timestamps in milliseconds, but that is a matter of choice. You can go all the way down to storing Y / M / D / H / m in separate fields. I prefer the logic in my code rather than in my DB.


*/

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    startTime: {type:Number, required:true},
    endTime: {type:Number, required:true},
    clientName: {type:String, required:true}
});

const Booking = mongoose.model('Booking', bookingSchema);

//Now, when we add a new booking, we can use some date logic (easier with timestamps) to check if there is a conflict with a preexisting booking :

let newStartTime = someTimestamp;
let newEndTime = someOtherTimestamp;
let newClientName = 'John Doe';

let conflictingBookings = await Booking.find()
    .where('startTime').lt(newEndTime)
    .where('endTime').gt(newStartTime)
    .exec();

    // This selects all preexisting bookings which have both :
// ---> startTime < newEndTime
// ---> endTime > newStartTime

// Now, conflictingBookings is an array containing all documents in conflict.
// You can tell your barber the problems :

if (conflictingBookings.length === 0) {
    // everything ok, you can book it
    // here you add the new booking to your DB...
} else {

    conflictingBookings.forEach( booking => {
        console.log(`There is already a booking from ${convertToString(booking.startTime)} to ${convertToString(booking.endTime)} with ${booking.clientName} !`);
    });

    // convertToString() being your custom function to convert timestamps to readable dates (not discussed here).
    // we log all conflicting preexisting bookings to the console

}