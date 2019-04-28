<?php

namespace App\Http\Controllers;

use App\ClassSeats;
use App\Flight;
use App\FlightClass;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('welcome');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $data = $request->all();

        if (empty($data)) {
            return $response()->json('Missing Input');
        }

        $seats = $data['passenger'];
        $class = $data['category'];

        $flight_class = FlightClass::where('class_name', $class)->get();
        $seat_id = $flight_class[0]->id;

        $flightId = Flight::with('airlineDetails', 'fareDetails')->where('departure_city', $data['departure'])->where('arrival_city', $data['arrival'])->where('departure_date', $data['date'])->get();

        $flight = [];
        foreach ($flightId as $flightId) {
            $seats_left = ClassSeats::where('flight_id', $flightId->flight_id)->where('class_id', $seat_id)->get()->pluck('seats_left');

            if ($seats_left >= $seats) {
                $flight[] = $flightId;
            }

        }
        return response()->json($flight);

        // $flight_details=AirlineDetails::where('flight_id',1)->get();

        // echo"$flight_details";
        // die;
        // $flightId = Flight::with('airlineDetails')->where('departureCity', $data['departure'])->where('arrivalCIty', $data['arrival'])->where('departureDate', $data['date'])->where('seatsLeft', '>', $data['passenger'])->get();
        // echo "$flightId";
        // die;

        // $flight_details= $flight->airlineDetails()->where('airline_id',101)->get();
        // echo"$flight";
        // die;
        // foreach ($flightId as $id) {
        //     $flight_details = Airline::where('id', $id)->get();
        //     $flight = DB::table('flight')->where('departureCity', $data['departure'])->where('arrivalCity', $data['arrival'])->where('departureDate', $data['date'])->where('seatsLeft', '>', $data['passenger'])->where('airline_id', $id)->get();

        //     // echo"$flight";
        //     // echo"$flight_details";
        //     $array = json_encode(array('airline' => $flight[0], "flight" => $flight_details));
        //     var_dump($array);
        //     die;
        // $array=json_encode($flight_details->toArray(),$flight->toArray());
        // $res=$flight_details->merge($flight);
        // echo"$res";
        // die;
        //     //    echo"$array";
        //     $result=array_merge($array1,json_decode($array));

        // return response()->json($flight);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
