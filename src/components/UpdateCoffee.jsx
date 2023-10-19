import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffee = useLoaderData();

    const { _id, name, quantity, supplier, taste, category, details, photo } = coffee;

    const handleUpdateCoffee = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newCoffee = { name, quantity, supplier, taste, category, details, photo }

        console.log(newCoffee);

        //send data to server
        fetch(`https://coffee-store-server-49sv4rrwc-rakib-hasans-projects-6047b42f.vercel.app/coffee/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Coffee updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <div className="bg-[#F4F3F0] p-24">
            <h2 className="text-3xl font-extrabold">Update Coffee: {name}</h2>
            <form onSubmit={handleUpdateCoffee}>
                {/* name , quantity */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="name" defaultValue={name} placeholder="Coffee Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Available Quantity</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="quantity" defaultValue={quantity} placeholder="Available Quantity" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                {/* supplier, taste */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Supplier</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="supplier" defaultValue={supplier} placeholder="Supplier" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="taste" defaultValue={taste} placeholder="Taste" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                {/* category, details */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="category" defaultValue={category} placeholder="Category" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="details" defaultValue={details} placeholder="Details" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                {/* photo url */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="photo" defaultValue={photo} placeholder="Photo URL" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                <input type="submit" className="btn btn-block btn-neutral" value="Update Coffee" />
            </form>
        </div>
    );
};

export default UpdateCoffee;