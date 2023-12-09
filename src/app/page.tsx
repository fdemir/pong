"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinSchema } from "@/server/schema/room";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { trpc } from "./_trpc/api";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constant";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const { mutate } = trpc.room.join.useMutation({
		onSuccess: (data) => {
			localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
			router.push(`/r/${form.getValues("room")}`);
		},
	});

	const form = useForm<z.infer<typeof joinSchema>>({
		resolver: zodResolver(joinSchema),
		defaultValues: {
			room: "",
			name: "",
		},
	});

	const onSubmit = (data: z.infer<typeof joinSchema>) => {
		mutate(data);
	};

	return (
		<div className="h-screen flex items-center justify-center container">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-[400px] flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="room"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Room ID</FormLabel>
								<FormControl>
									<Input
										placeholder="
                    Type a room ID to join or create a new one
                  "
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="
                    What should we call you?
                  "
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Join</Button>
				</form>
			</Form>
		</div>
	);
}
