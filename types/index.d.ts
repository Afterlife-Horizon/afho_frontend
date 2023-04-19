interface defaultProps extends React.ComponentPropsWithoutRef<"div"> {
	user: User;
	fetchInfo: IFetchData;
	isAdmin: boolean;
}
