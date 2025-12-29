# ===== build stage =====
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# copy csproj and restore (fast caching)
COPY *.csproj ./
RUN dotnet restore

# copy everything and publish
COPY . ./
RUN dotnet publish -c Release -o /out /p:UseAppHost=false

# ===== runtime stage =====
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

COPY --from=build /out ./
ENTRYPOINT ["dotnet", "BrokerApp.dll"]
