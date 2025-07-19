'use client'
import CardUser from '@/components/card-user/CardUser';
import { UserType } from '@/types/userType';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function User() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [,setUsers] = useState<UserType[]>([]);
    const [filtered, setFiltered] = useState<UserType[]>([]);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const search = searchParams.get('search') || '';
        setQuery(search);

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users`)
            .then(response => response.json())
            .then(data => {
                const userList = data.users || data
                setUsers(userList)

                const result = search ?
                    userList.filter((user: UserType) => (
                        user.username.toLowerCase().includes(search.toLowerCase())
                    ))
                    : userList;
                setFiltered(result);
            }
            ).catch(error => console.error('Error fetching users:', error));
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setQuery(val)
        router.push(`/user?search=${encodeURIComponent(val)}`)
    }
    return (
        <>
            <div className='w-[90%] mx-auto mt-10'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search by name..."
                    className="p-2 w-[90%] mx-auto mt-5 focus:outline-none"
                />
            </div>

            <section className='w-[90%] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

                {
                    filtered.map((user) => (
                        <CardUser
                            key={user.id}
                            id={user.id}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            email={user.email}
                            image={user.image}
                            username={user.username} age={0}                        />
                    ))
                }
            </section>
        </>

    )
}
